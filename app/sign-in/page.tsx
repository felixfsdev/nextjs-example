import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignInForm from "@/components/features/SignInForm";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className="flex w-full min-h-[75vh] justify-center items-center max-w-lg mx-auto p-4">
      <SignInForm />
    </div>
  );
}
