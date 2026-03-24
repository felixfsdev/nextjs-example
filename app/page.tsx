import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import FSImage from "@/assets/fs-nobg-cropped.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-4 w-full min-h-[75vh] justify-center items-center max-w-lg mx-auto p-4">
      <Image src={FSImage} className="w-20" alt="fs Image" priority />
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/home">
        <Button>Sign in</Button>
      </Link>
    </div>
  );
}
