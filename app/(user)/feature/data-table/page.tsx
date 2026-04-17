import { Article, ArticleContainer } from "@/components/layout/article";
import prisma from "@/lib/prisma";
import { DataTable, PostRow, columns } from "./_components/data-table";

async function getData(): Promise<PostRow[]> {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      featured: true,
      isApproved: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    author: post.author?.name ?? "Unknown",
    featured: post.featured,
    isApproved: post.isApproved,
    createdAt: post.createdAt.toISOString(),
  }));
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <ArticleContainer>
      <Article>
        <h1>Posts data table</h1>
        <p>
          This table displays rows from the Post model, including author,
          approval status, and creation time.
        </p>
        <DataTable columns={columns} data={data} />
      </Article>
    </ArticleContainer>
  );
}
