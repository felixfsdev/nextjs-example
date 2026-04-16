import { Article, ArticleContainer } from "@/components/layout/article";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowBigDown } from "lucide-react";

export default function TailwindAnimations() {
  return (
    <ArticleContainer>
      <Article>
        <h1>Tailwind animations</h1>
        <p>
          Tailwind provides utility classes to animate your elements easily.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>className</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">animate-bounce</TableCell>
              <TableCell className="text-xl animate-bounce">😀</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="font-mono">animate-bounce</span> with{" "}
                <span className="font-mono">delay</span>
              </TableCell>
              <TableCell>
                <div className="flex">
                  <p className="text-xl animate-bounce [animation-delay:-0.5s]">
                    😘
                  </p>
                  <p className="text-xl animate-bounce [animation-delay:-0.7s]">
                    😁
                  </p>
                  <p className="text-xl animate-bounce [animation-delay:-0.3s]">
                    😋
                  </p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">animate-ping</TableCell>
              <TableCell className="relative">
                <p className="text-xl absolute animate-ping bottom-2">💀</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">animate-pulse</TableCell>
              <TableCell className="text-xl animate-pulse">🥵</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">animate-spin</TableCell>
              <TableCell className="relative">
                <p className="text-xl absolute bottom-2 animate-spin">😵‍💫</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p>
          Animations can also be combined to create even more fun animations,
          like this:
        </p>
        <div className="animate-bounce">
          <div className="w-min text-xl animate-spin">😵</div>
        </div>
        <p>But you should put the content in nested divs.</p>

        <h2>Common usages</h2>

        <h3>Animate pulse</h3>
        <p>Animate pulse is commonly used for creating loading skeletons.</p>
        <Skeleton className="w-50 h-8" />
        <Skeleton className="w-80 h-4" />
        <Skeleton className="w-30 h-4" />

        <h3>Animate ping</h3>
        <p>Animate ping is generally used for notifications and badges.</p>
        <Button variant="outline" className="relative w-min">
          I'm Important
          <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="absolute inline-flex size-3 rounded-full bg-admin-badge"></span>
          </span>
        </Button>

        <h3>Animate bounce</h3>
        <p>This can be used for things like arrow buttons.</p>
        <Button variant="outline" size="icon" className="animate-bounce">
          <ArrowBigDown />
        </Button>

        <h3>Animate spin</h3>
        <p>The Shadcn spinner component uses animate-spin internally.</p>
        <Spinner />
      </Article>
    </ArticleContainer>
  );
}
