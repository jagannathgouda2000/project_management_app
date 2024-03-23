import React from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export async function handleGitLogin() {
    try {
        await signIn("github", {
            callbackUrl: `${window.location.origin}/dashboard`,
        });
    } catch (e) {
        console.log(e);
    }
}

const Login = ({ title }: { title?: string }) => {
    const { status } = useSession();
    const loading = status === "loading";
    const authenticated = status === "authenticated";

    if (loading || authenticated) return null;
    return (
        <Button
            onClick={handleGitLogin}
            className={`h-full rounded-md bg-secondary text-dark px-6 text-lg font-semibold hover:bg-brand-dark`}
        >
            {title || "Login through Github"}
        </Button>
    );
};

export default Login;
