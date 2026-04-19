import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import SignOutButton from "./_components/sign-out-button";
import UploadProfileImageButton from "./_components/upload-profile-image-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useState,
  useTransition,
} from "react";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { changeUsername, updateProfileImage } from "./actions";
import Link from "next/link";
import { Camera, Loader2, LogOut, UserPen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserMenu() {
  const { data: session, status } = useSession();

  return (
    <Drawer direction="right">
      {status === "loading" || session ? (
        <DrawerTrigger asChild>
          {status === "loading" ? (
            <Skeleton className="size-8 rounded-full border" />
          ) : (
            <Image
              src={String(session?.user?.image)}
              width={240}
              height={240}
              alt="User Avatar"
              referrerPolicy="no-referrer"
              className="size-8 rounded-full border"
            />
          )}
        </DrawerTrigger>
      ) : (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="hidden">User menu</DrawerTitle>
          <UserMenuContent />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UserMenuContent() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}

      <div className="flex gap-4 pb-4 border-b">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            width={240}
            height={240}
            alt="User Avatar"
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full"
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-heading font-bold">
            {session?.user?.name}
          </h1>
          <p className="text-muted-foreground">{session?.user?.email}</p>
        </div>
      </div>

      {/* Actions */}

      <div className="flex flex-col">
        <UploadProfileImageButton />
        <ChangeUsernameButton />
        <SignOutButton />
      </div>
    </div>
  );
}

function ChangeUsernameButton() {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      await changeUsername(username);
      setOpen(false);
      setUsername("");
      window.location.reload();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <UserPen className="mr-2 size-4" />
          Change Username
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="change-username-description">
        <DialogHeader>
          <DialogTitle>Change username</DialogTitle>
          <DialogDescription id="change-username-description">
            This changes how you are displayed on this website.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Your new username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isPending}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleSubmit}
            disabled={!username.trim() || isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
