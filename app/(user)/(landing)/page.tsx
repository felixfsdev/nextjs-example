import { auth } from "@/auth";
import Header from "./_components/header";
import AppContents from "./_components/app-contents";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4">
      <Header />
      <AppContents />
    </div>
  );
}
