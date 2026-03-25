import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import FSImage from "@/assets/fs-nobg-cropped.png";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex  w-full min-h-[75vh] justify-center items-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center mb-2">
            Welcome to Next.js Example!
          </CardTitle>
          <CardDescription className="text-center">
            Hey, thanks for visiting. This is my Next.js example application
            which I made to learn Next.js.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/home" className="w-full">
            <Button className="w-full">Open App</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
