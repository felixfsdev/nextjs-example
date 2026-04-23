import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, CircleCheckBig, ShieldUser } from "lucide-react";
import { auth } from "@/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { StandardContainer } from "@/components/layout/prose";

export default async function PostPage() {
  const session = await auth();
  const adminEmail = "faseeh1080@gmail.com";

  const posts = await prisma.post.findMany({
    where: {
      isApproved: true,
    },
    take: 20,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: { author: true },
  });

  return (
    <StandardContainer>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Browse recent posts created by users.
          </p>
        </div>
        <Link href="/post/create" className="self-start">
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
                <CardTitle>
                  {post.isApproved ? post.title : "Content Removed"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "text-sm text-muted-foreground mb-4 whitespace-pre-line",
                    !post.isApproved && "italic",
                  )}
                >
                  {post.isApproved
                    ? post.content
                    : "This post was removed because it was deemed inappropriate for this platform."}
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
                    {post.featured && <FeaturedBadge />}
                    {post.author.email === adminEmail && <AdminBadge />}
                  </div>
                  <div className="flex items-center gap-2">
                    {new Date(post.createdAt).toLocaleString()}
                    <Link href={`/post/${post.id}`}>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <p className="text-sm text-muted-foreground text-center">
            Only recent posts are shown here. Click{" "}
            <Link href="/post/removed" className="underline">
              here
            </Link>{" "}
            to view removed posts.
          </p>
        </div>
      )}
    </StandardContainer>
  );
}

function FeaturedBadge() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <CircleCheckBig className="size-4 text-chart-2" />
      </TooltipTrigger>
      <TooltipContent>Featured</TooltipContent>
    </Tooltip>
  );
}

function AdminBadge() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <ShieldUser className="size-4 text-blue-600 dark:text-blue-400" />
      </TooltipTrigger>
      <TooltipContent>Admin</TooltipContent>
    </Tooltip>
  );
}
