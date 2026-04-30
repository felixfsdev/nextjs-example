import { auth } from "@/auth";
import CreatePostForm from "./_components/create-post-form";
import HasPosted from "./_components/has-posted";
import { redirect } from "next/navigation";
import { hasPermissionToCreatePost } from "./utils";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col w-full flex-1 justify-center items-center p-4 gap-4">
      <div className="w-full max-w-2xl p-2 sm:p-4">
        {(await hasPermissionToCreatePost()) ? (
          <CreatePostForm />
        ) : (
          <HasPosted />
        )}
      </div>
    </div>
  );
}
