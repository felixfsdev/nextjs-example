"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasPermissionToCreatePost } from "../utils";

export async function createPost(data: { title: string; content: string }) {
  if (!hasPermissionToCreatePost()) {
    return {
      error:
        "You do not have the permission to create a post today. Please try again later",
    };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const title = data.title.trim();
  const content = data.content.trim();

  if (title.length < 1) {
    return { error: "Title is required." };
  }

  if (content.length < 1) {
    return { error: "Content is required." };
  }

  if (title.length > 100) {
    return { error: "Title is longer than 100 characters." };
  }

  if (content.length > 5000) {
    return { error: "Content exceeds the 5000 character limit." };
  }

  await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user.id,
    },
  });

  revalidatePath("/post");

  return { success: true };
}
