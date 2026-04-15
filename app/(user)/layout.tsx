import { SessionProvider } from "next-auth/react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/sign-in");
  // }

  return (
    <>
      <SessionProvider>
        <Navbar />
        <div className="w-full min-h-screen">{children}</div>
        <Footer />
      </SessionProvider>
    </>
  );
}
