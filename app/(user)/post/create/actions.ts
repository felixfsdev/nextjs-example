"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(data: { title: string; content: string }) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be signed in to create a post");
  }

  await prisma.post.create({
    data: {
      title: data.title.trim(),
      content: data.content.trim(),
      authorId: session.user.id,
    },
  });

  revalidatePath("/posts");
}
