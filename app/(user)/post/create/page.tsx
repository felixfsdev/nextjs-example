import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CreatePostForm from "./_components/create-post-form";
import HasPosted from "./_components/has-posted";
import { redirect } from "next/navigation";
import CenterContainer from "@/components/layout/center-container";
import { hasPermissionToCreatePost } from "./utils";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <CenterContainer>
      <div className="w-full max-w-2xl p-2 sm:p-4">
        {(await hasPermissionToCreatePost()) ? (
          <CreatePostForm />
        ) : (
          <HasPosted />
        )}
      </div>
    </CenterContainer>
  );
}
