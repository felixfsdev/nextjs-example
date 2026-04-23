"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function deletePost(data: { postId: string }) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: You must be logged in.");
  }

  const post = await prisma.post.findUnique({
    where: { id: data.postId },
    select: { authorId: true },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.authorId !== session.user.id) {
    throw new Error("Forbidden: You are not the owner of this post.");
  }

  return await prisma.post.delete({
    where: { id: data.postId },
  });
}
