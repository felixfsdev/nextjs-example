import { SessionProvider } from "next-auth/react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

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
    <div className="flex flex-col w-full h-full">
      <SessionProvider>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </SessionProvider>
    </div>
  );
}
