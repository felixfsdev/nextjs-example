"use client";

import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import GitHubIcon from "@/components/ui/icons/GitHubIcon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  return (
    <div className="flex flex-col w-full gap-2 border border-border p-4 rounded">
      <h1 className="text-center text-2xl mb-4">Sign in with Email</h1>
      <form className="flex flex-col sm:flex-row w-full gap-4">
        <Input
          type="email"
          name="email"
          className="flex-1"
          placeholder="Currently not supported"
          disabled
        />
        <Button type="submit" className="shrink-0 whitespace-nowrap" disabled>
          Sign In
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <hr className="flex-1 text-border" />
        <p>or</p>
        <hr className="flex-1 text-border" />
      </div>

      <Button
        variant="secondary"
        disableOnClick
        onClick={() => signIn("google", { redirectTo: "/home" })}
      >
        <GoogleIcon className="w-4 h-4" />
        Sign in with Google
      </Button>

      <Button
        variant="secondary"
        disableOnClick
        onClick={() => signIn("github", { redirectTo: "/home" })}
      >
        <GitHubIcon className="w-4 h-4" /> Sign in with GitHub
      </Button>
    </div>
  );
}
