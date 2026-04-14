import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CreatePostForm from "./components/create-post-form";
import HasPosted from "./components/has-posted";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col w-full min-h-[75vh] justify-center items-center max-w-2xl mx-auto p-4">
      {hasPostedToday ? <HasPosted /> : <CreatePostForm />}
    </div>
  );
}
