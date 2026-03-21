"use client";

import Button from "@/components/ui/Button";
import GithubIcon from "@/components/ui/icons/GitHubIcon";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const resendAction = (formData: FormData) => {
    signIn("resend", Object.fromEntries(formData));
  };

  return (
    <div className="flex w-full min-h-[75vh] justify-center items-center max-w-lg mx-auto p-4">
      <div className="flex flex-col w-full gap-2 border border-border p-4 rounded">
        <h1 className="text-center text-2xl mb-4">Sign in with Email</h1>
        <form
          action={resendAction}
          className="flex flex-col md:flex-row w-full gap-4"
        >
          <Input
            type="email"
            name="email"
            className="flex-1"
            placeholder="Email"
          />
          <Button type="submit" className="shrink-0 whitespace-nowrap">
            Sign In
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <hr className="flex-1 text-border" />
          <p>or</p>
          <hr className="flex-1 text-border" />
        </div>

        <button
          className="flex items-center justify-center w-full p-1 gap-2 hover:bg-bg-hover hover:cursor-pointer border border-border rounded"
          onClick={() => signIn("github")}
        >
          <GithubIcon className="w-4 h-4" /> Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
