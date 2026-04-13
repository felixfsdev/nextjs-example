import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function PostPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Browse recent posts created by users.
          </p>
        </div>
        <Link href="/feature/post/create" className="self-start">
          <Button>Create Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No posts yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create the first post or come back later to see new content.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                  {post.content ?? "No content provided."}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {post.author?.image ? (
                      <Image
                        src={post.author.image}
                        width={24}
                        height={24}
                        alt={`Avatar of ${post.author?.name ?? "author"}`}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[0.65rem] font-semibold uppercase text-muted-foreground">
                        {post.author?.name
                          ? post.author.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                          : "?"}
                      </div>
                    )}
                    <span>By {post.author?.name ?? "Unknown author"}</span>
                    {post.featured && (
                      <Tooltip>
                        <TooltipTrigger>
                          <CircleCheckBig className="size-4 text-chart-2" />
                        </TooltipTrigger>
                        <TooltipContent>Featured</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger>
                        <Trash className="size-4" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete this post</DialogTitle>
                          <DialogDescription>
                            Post deletion is managed by the site administrator.
                            Please direct your request to{" "}
                            <a href="mailto:faseeh1080@gmail.com">
                              faseeh1080@gmail.com
                            </a>
                            .
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Ok</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
