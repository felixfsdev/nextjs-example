"use client";

import GoogleIcon from "@/components/icons/google-icon";
import GitHubIcon from "@/components/icons/github-icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="flex flex-col min-h-dvh items-center justify-center">
      <Card className="w-full max-w-lg m-4">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            You have to sign in to access all features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <h2>Sign in with Email</h2>
            <form className="flex flex-col w-full gap-4">
              <Input
                type="email"
                name="email"
                className="flex-1"
                placeholder="Currently not supported"
                disabled
              />
              <Button
                type="submit"
                className="shrink-0 whitespace-nowrap"
                disabled
              >
                Sign In
              </Button>
            </form>

            <div className="flex items-center gap-2">
              <hr className="flex-1 text-border" />
              <p>or</p>
              <hr className="flex-1 text-border" />
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="secondary"
                onClick={() => signIn("google", { redirectTo: "/post" })}
              >
                <GoogleIcon className="w-4 h-4" />
                Sign in with Google
              </Button>

              <Button
                variant="secondary"
                onClick={() => signIn("github", { redirectTo: "/post" })}
              >
                <GitHubIcon className="w-4 h-4" /> Sign in with GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
