import { Article, ArticleContainer } from "@/components/layout/article";
import ErrorPage from "@/components/layout/error-page";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { id: slug },
    include: { author: true },
  });

  if (!post) {
    return <ErrorPage description="That URL does not match any post" />;
  }

  return (
    <ArticleContainer>
      <Article>
        <h1>{post!.title}</h1>
        <p className="text-muted-foreground text-sm">By {post.author.name}</p>
        <p>{post.content}</p>
        <hr />
        <h2>Thanks for reading</h2>
        <p>
          Big thanks to <span className="font-bold">{post.author.name}</span>{" "}
          for his contribution!
        </p>
        <Image
          src={String(post.author.image)}
          alt="Author Image"
          width={71}
          height={71}
          className="rounded-full"
        />
        <Link href="/feature/post">
          <Button variant="link" className="px-0">
            Read More
          </Button>
        </Link>
      </Article>
    </ArticleContainer>
  );
}
