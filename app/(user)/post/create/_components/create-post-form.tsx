"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "../actions";
import { Spinner } from "@/components/ui/spinner";
import prisma from "@/lib/prisma";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createPost({ title, content });
      setIsSubmitted(true);
      // Redirect
      router.push("/post");
    } catch (error) {
      console.error("Failed to create post:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>
          <p>
            Share what’s new or noteworthy to you today. Focus on recent events,
            ideas, or updates you want others to see. Your post will be
            displayed first until someone else publishes a newer one.
          </p>
          <p className="mt-2 text-foreground">
            Note: Your username and profile picture will be visible.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="h-32 w-full resize-none min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-vertical"
              required
              disabled={isSubmitting}
            />
          </div>

          {errorMessage && (
            <p className="text-destructive">Error: {errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              isSubmitted ||
              !title.trim() ||
              content.trim().length < 10
            }
          >
            {isSubmitting || isSubmitted ? (
              <div className="flex items-center gap-2">
                <Spinner className="size-4" />
                {isSubmitting ? "Uploading" : "Done, redirecting"}
              </div>
            ) : (
              "Upload Post"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
