import Image from "next/image";
import fsImage from "@/assets/fs.png";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="text-center mb-4">
      <Image
        src={fsImage}
        alt="App Image"
        className="w-25 rounded-full border-2 border-foreground mx-auto my-4"
      />
      <h1 className="text-2xl">Next.js Example</h1>
      <p className="text-muted-foreground mt-1 mb-3">
        An all-in-one Next.js application
      </p>
      <a href="https://github.com/faseehfs/nextjs-example">
        <Button>View on GitHub</Button>
      </a>
    </div>
  );
}
