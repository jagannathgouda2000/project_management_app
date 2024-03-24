import React from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export async function handleGitLogin() {
  try {
    await signIn("github", {
      callbackUrl: process.env.NEXT_PUBLIC_LOGIN_REDIRECT,
    });
  } catch (e) {
    console.log(e);
  }
}

const Login = ({ title = "Login" }: { title?: string }) => {
  const { status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated";

  if (loading || authenticated) return null;
  return (
    <Button
      onClick={handleGitLogin}
      className={`text-dark hover:bg-brand-dark h-full rounded-full bg-secondary px-6 text-lg font-semibold`}
    >
      {title}
    </Button>
  );
};

export default Login;
