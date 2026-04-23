"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { deletePost } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function DeletePostDialog({
  postId,
  isOwner,
}: {
  postId: string;
  isOwner: boolean;
}) {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await deletePost({ postId });
      router.refresh();
    } finally {
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash className="size-4 hover:text-destructive transition-all" />
      </DialogTrigger>
      <DialogContent aria-describedby="delete-post">
        <DialogHeader>
          <DialogTitle>
            {isOwner ? "Do you want to delete this post?" : "Unauthorized"}
          </DialogTitle>
          <DialogDescription>
            {isOwner ? (
              "This action cannot be undone. This will permanently delete your post."
            ) : (
              <>
                You are not the author of this post. If you think this post was
                inappropriate, please direct your request to{" "}
                <a
                  href="mailto:faseeh1080@gmail.com"
                  className="underline font-medium"
                >
                  faseeh1080@gmail.com
                </a>
                .
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{isOwner ? "Cancel" : "Close"}</Button>
          </DialogClose>
          {isOwner && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Spinner className="size-4" /> : "Delete Post"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
