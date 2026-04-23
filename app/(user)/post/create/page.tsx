import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CreatePostForm from "./_components/create-post-form";
import HasPosted from "./_components/has-posted";
import { redirect } from "next/navigation";
import CenterContainer from "@/components/layout/center-container";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
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

  return (
    <CenterContainer>
      <div className="w-full max-w-2xl p-4">
        {hasPostedToday ? <HasPosted /> : <CreatePostForm />}
      </div>
    </CenterContainer>
  );
}
