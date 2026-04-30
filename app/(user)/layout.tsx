import { SessionProvider } from "next-auth/react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default async function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <SessionProvider>
        <Navbar />
        <div className="flex flex-col flex-1">{children}</div>
        <Footer />
      </SessionProvider>
    </div>
  );
}
