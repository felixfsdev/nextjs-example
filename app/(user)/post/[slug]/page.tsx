import { Prose, ProseContainer } from "@/components/typography/prose";
import ErrorPage from "@/components/layout/error-page";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Calendar, PenLine, TriangleAlert } from "lucide-react";
import { DeletePostDialog } from "./_components/delete-post-dialog";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Role } from "@/prisma/src/generated/prisma/enums";
import { AdminBadge, FeaturedBadge } from "@/components/ui/badges";

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
    <ProseContainer className="my-2">
      <Prose>
        <h1>{post!.title}</h1>
        <div className="not-prose flex items-center gap-2 text-muted-foreground text-sm">
          <Image
            src={String(post.author.image)}
            alt="Author Image"
            width={24}
            height={24}
            className="rounded-full border size-6"
          />
          <p>
            By <span className="italic">{post.author.name}</span>
          </p>
          <Calendar className="size-4" />
          <p>{post.createdAt.toLocaleDateString()}</p>
          {post.author.role === Role.ADMIN && (
            <>
              <AdminBadge />
              <p>Admin</p>
            </>
          )}
          {post.featured && (
            <>
              <FeaturedBadge />
              <p>Featured</p>
            </>
          )}
        </div>
        {!post.isApproved && <PostRemovedCard />}
        <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
        {post.isApproved && (
          <>
            <hr />
            <h2>Thanks for reading</h2>
            <p>
              Big thanks to{" "}
              <span className="font-bold">{post.author.name}</span> for his
              contribution! Click <Link href="/post">here</Link> to read more
              posts.
            </p>
            <Image
              src={String(post.author.image)}
              alt="Author Image"
              width={71}
              height={71}
              className="rounded-full border"
            />
          </>
        )}

        {session?.user?.id === post.author.id && (
          <>
            <hr />
            <p>You are the owner of this post.</p>
            <div className="flex gap-2">
              <Link href={`/post/edit/${post.id}`}>
                <Button variant="outline">
                  <PenLine className="size-4" />
                  Edit Post
                </Button>
              </Link>
              <DeletePostDialog postId={post.id} />
            </div>
          </>
        )}
      </Prose>
    </ProseContainer>
  );
}

function PostRemovedCard() {
  return (
    <Card className="not-prose my-10 border-destructive bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <TriangleAlert className="size-5" />
          <span>Post Removed</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This post was removed from the public feed for violating community
          guidelines.
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/post" passHref>
          <Button size="sm">Go back</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
