import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function () {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-2xl font-heading text-center">Submission Received</h1>
      <p className="text-muted-foreground text-center">
        Thank you for your contribution 🥰 To maintain quality, posts are
        limited to one per day. Your next submission window opens tomorrow!
        Delete your today's post to create one right now.
      </p>
      <Link href="/post">
        <Button>Read Posts</Button>
      </Link>
    </div>
  );
}
