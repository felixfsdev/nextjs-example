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
    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </SessionProvider>
    </div>
  );
}
