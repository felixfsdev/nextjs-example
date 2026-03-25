import Article from "@/components/ui/article";
import ApiMessage from "./api-message";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Article>
        <h1>Homepage</h1>
        <ApiMessage />
        <p>Hello {session?.user?.name}!</p>
      </Article>
    </div>
  );
}
