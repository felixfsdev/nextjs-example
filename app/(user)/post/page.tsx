import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { ProseContainer } from "@/components/typography/prose";
import { AdminBadge, FeaturedBadge } from "@/components/ui/badges";
import { Role } from "@/prisma/src/generated/prisma/enums";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PostPage({ searchParams }: PostPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = 10;
  const skip = (page - 1) * limit;

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: {
        isApproved: true,
      },
      take: limit,
      skip,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: { author: true },
    }),
    prisma.post.count({
      where: {
        isApproved: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <ProseContainer>
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

              <CardContent className="space-y-4">
                {/* Preview Content */}
                <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-1 whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 flex-wrap">
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
                    {post.author.role === Role.ADMIN && <AdminBadge />}
                    {post.featured && <FeaturedBadge />}
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-2">
                    {new Date(post.createdAt).toLocaleString()}
                    <Link href={`/post/${post.id}`}>
                      <Button variant="outline" size="sm">
                        Read Full
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {page > 1 ? (
                <Link href={`/post?page=${page - 1}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft size={16} />
                    Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <ArrowLeft size={16} />
                  Previous
                </Button>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, page - 2) + i;
                if (pageNum > totalPages) return null;
                return (
                  <Link key={pageNum} href={`/post?page=${pageNum}`}>
                    <Button
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                    >
                      {pageNum}
                    </Button>
                  </Link>
                );
              })}

              {page < totalPages ? (
                <Link href={`/post?page=${page + 1}`}>
                  <Button variant="ghost" size="sm">
                    Next
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  Next
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          )}
          <p className="text-sm text-muted-foreground text-center">
            Only recent posts are shown here. Click{" "}
            <Link href="/post/removed" className="underline">
              here
            </Link>{" "}
            to view removed posts.
          </p>
        </div>
      )}
    </ProseContainer>
  );
}
