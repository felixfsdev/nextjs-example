import CenterContainer from "@/components/layout/center-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <CenterContainer>
      <div className="flex gap-2 justify-center items-center">
        <p className="text-muted-foreground text-center">Welcome to</p>
        <h1 className="text-2xl text-center">Posts</h1>
      </div>
      <Link href="/post">
        <Button>Let's Read</Button>
      </Link>
    </CenterContainer>
  );
}
