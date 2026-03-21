import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
