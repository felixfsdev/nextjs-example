import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role } from "@/prisma/src/generated/prisma/enums";

export async function hasPermissionToCreatePost() {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  const user = session.user as any;
  if (user.role === Role.ADMIN) {
    return true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const hasPostedToday = !!(await prisma.post.findFirst({
    where: {
      authorId: session?.user?.id,
      createdAt: {
        gte: today,
      },
    },
    select: { id: true }, // Optimization: only fetch the ID, not the whole post
  }));

  if (hasPostedToday) {
    return false;
  }
  return true;
}
