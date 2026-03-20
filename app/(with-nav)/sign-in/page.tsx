"use client";

import GithubIcon from "@/components/GitHubIcon";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const resendAction = (formData: FormData) => {
    signIn("resend", Object.fromEntries(formData));
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <h1 className="text-2xl mb-4">Choose a sign in method</h1>

      <form action={resendAction}>
        <label htmlFor="email-resend">
          Email
          <input type="email" id="email-resend" name="email" />
        </label>
        <input type="submit" value="Signin with Resend" />
      </form>

      <button
        className="flex items-center justify-center w-full p-1 gap-2 hover:bg-bg-hover hover:cursor-pointer border border-border rounded"
        onClick={() => signIn("github")}
      >
        <GithubIcon className="w-4 h-4" /> Sign in with GitHub
      </button>
    </div>
  );
}
