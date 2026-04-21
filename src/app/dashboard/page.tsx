"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <>
      <div>DashboardPage</div>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

export default DashboardPage;