"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const MAX_TITLE_CHARS = 100;
const MAX_CHARS = 500;
const MAX_NEWLINES = 6;

export async function createPost(data: { title: string; content: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = data.title.trim();
  const content = data.content.trim();
  const newlineCount = (content.match(/\n/g) || []).length;

  if (title.length < 1) {
    throw new Error("Title is required.");
  }

  if (content.length < 10) {
    throw new Error("Content is less than 10 characters.");
  }

  if (title.length > MAX_TITLE_CHARS) {
    throw new Error(`Title is longer than ${MAX_TITLE_CHARS} characters.`);
  }

  if (content.length > MAX_CHARS) {
    throw new Error(`Content exceeds the ${MAX_CHARS} character limit.`);
  }

  if (newlineCount > MAX_NEWLINES) {
    throw new Error(`Content exceeds the limit of ${MAX_NEWLINES} newlines.`);
  }

  await prisma.post.create({
    data: { title, content, authorId: session.user.id },
  });

  revalidatePath("/post");
}
