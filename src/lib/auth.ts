import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";
import client from "./mongodb";
import { emailOTP } from "better-auth/plugins";

const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  if (html) {
    await resend.emails.send({
      from: "noreply@yourdomain.com",
      to,
      subject,
      html,
    });
  } else {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text: text ?? "",
    });
  }
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }) => {
      sendEmail({
        to: user.email,
        subject: "Sign-up attempt with your email",
        text: "Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.",
      }).catch(console.error);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `
          <h2>Verify your email</h2>
          <p>Click the link below to verify your account:</p>
          <a href="${url}">Verify Email</a>
        `,
      });
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const config: Record<string, { subject: string; html: string }> = {
          "sign-in": {
            subject: "Your sign-in OTP",
            html: `
              <h2>Sign-in OTP</h2>
              <p>Use the code below to sign in. It expires in 10 minutes.</p>
              <h1 style="letter-spacing: 4px;">${otp}</h1>
              <p>If you didn't request this, you can safely ignore this email.</p>
            `,
          },
          "email-verification": {
            subject: "Verify your email",
            html: `
              <h2>Email Verification</h2>
              <p>Use the code below to verify your email. It expires in 10 minutes.</p>
              <h1 style="letter-spacing: 4px;">${otp}</h1>
              <p>If you didn't request this, you can safely ignore this email.</p>
            `,
          },
          "forget-password": {
            subject: "Reset your password",
            html: `
              <h2>Password Reset</h2>
              <p>Use the code below to reset your password. It expires in 10 minutes.</p>
              <h1 style="letter-spacing: 4px;">${otp}</h1>
              <p>If you didn't request this, please secure your account immediately.</p>
            `,
          },
        };

        const { subject, html } = config[type];

        await sendEmail({ to: email, subject, html });
      },
    }),
  ],
});
