import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArticleContainer } from "@/components/layout/article";

export default async function RemovedPostsPage() {
  const posts = await prisma.post.findMany({
    where: {
      isApproved: false,
    },
    take: 20,
    orderBy: [{ createdAt: "desc" }],
    include: { author: true },
  });

  return (
    <ArticleContainer>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Removed posts</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Posts that were removed from the public feed.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-muted p-6 bg-muted/50 text-muted-foreground">
          No removed posts found.
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/${post.id}`} className="hover:underline">
                <p className="text-lg font-semibold text-primary">
                  {post.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  By {post.author?.name ?? "Unknown author"}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </ArticleContainer>
  );
}
