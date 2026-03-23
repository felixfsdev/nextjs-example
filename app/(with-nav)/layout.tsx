import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
