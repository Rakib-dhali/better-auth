"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/dashboard",
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    if (data) {
      setSubmitted(true);
    }
  };

  const resendVerificationEmail = async () => {
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-7xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">

            {submitted ? (
              <div className="text-center space-y-4 max-w-xs">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Check your email</h1>
                <p className="text-gray-600 text-sm">
                  We sent a verification link to <strong>{email}</strong>. Click
                  it to activate your account.
                </p>
                <button
                  type="button"
                  onClick={resendVerificationEmail}
                  className="text-indigo-500 text-sm underline"
                >
                  Resend verification email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto space-y-5 max-w-xs">
                    <input
                      name="name"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      required
                    />
                    <input
                      name="email"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <input
                      name="password"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />

                    {errorMsg && (
                      <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">
                        {loading ? "Signing up..." : "Sign Up"}
                      </span>
                    </button>

                    <p className="text-sm text-center">
                      Already have an account?{" "}
                      <Link href="/signin" className="text-indigo-500 hover:underline">
                        Sign in
                      </Link>
                    </p>

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by{" "}
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>{" "}
                      and its{" "}
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}