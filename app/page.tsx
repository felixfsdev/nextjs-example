import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import FSImage from "@/assets/fs-nobg-cropped.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-4 w-full min-h-[75vh] justify-center items-center max-w-lg mx-auto p-4">
      <Image src={FSImage} className="w-40" alt="fs Image" priority />
      <h1 className="text-6xl">Welcome</h1>
      <Link href="/sign-in/">
        <Button>Sign in</Button>
      </Link>
    </div>
  );
}
