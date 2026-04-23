import { Prose, StandardContainer } from "@/components/layout/prose";
import ErrorPage from "@/components/layout/error-page";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DeletePostDialog } from "./_components/delete-post-dialog";
import { auth } from "@/auth";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { id: slug },
    include: { author: true },
  });

  if (!post) {
    return <ErrorPage description="That URL does not match any post" />;
  }

  return (
    <StandardContainer>
      <Prose>
        <h1>{post!.title}</h1>
        <p className="text-muted-foreground text-sm">By {post.author.name}</p>
        {!post.isApproved && (
          <div className="flex gap-2 text-destructive items-center">
            <TriangleAlert className="size-4" />
            <p>
              Warning: This post was removed from the public feed. You better{" "}
              <Link href="/post" className="underline">
                go back
              </Link>
              .
            </p>
          </div>
        )}
        <p>{post.content}</p>
        {post.isApproved && (
          <>
            <Separator className="my-4" />
            <h2>Thanks for reading</h2>
            <p>
              Big thanks to{" "}
              <span className="font-bold">{post.author.name}</span> for his
              contribution!
            </p>
            <Image
              src={String(post.author.image)}
              alt="Author Image"
              width={71}
              height={71}
              className="rounded-full border"
            />
            <Link href="/post">
              <Button variant="link" className="px-0">
                Read More
              </Button>
            </Link>
          </>
        )}

        {session?.user?.id === post.author.id && (
          <>
            <p>
              You are the owner of this post. So you can delete it if you want.
            </p>
            <DeletePostDialog postId={post.id} />
          </>
        )}
      </Prose>
    </StandardContainer>
  );
}
