"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function changeUsername(newUsername: string) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }

  if (!newUsername || newUsername.trim().length < 1) {
    throw new Error("Username must be at least 1 character");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: newUsername.trim() },
    });
  } catch {
    throw new Error("Failed to update username");
  }

  return { success: true };
}

export async function updateProfileImage(imageUrl: string) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }

  if (!imageUrl || imageUrl.trim().length < 1) {
    throw new Error("Image URL is required");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl.trim() },
    });
  } catch {
    throw new Error("Failed to update profile image");
  }

  return { success: true };
}
