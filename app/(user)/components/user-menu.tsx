import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

export default function UserMenu() {
  const { data: session } = useSession();

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            width={240}
            height={240}
            alt="User Avatar"
            referrerPolicy="no-referrer"
            className="w-7 rounded-full transition-all duration-50 hover:outline-3 outline-ring outline-0"
          />
        )}
      </DrawerTrigger>
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
      <div className="flex gap-4 pb-4 border-b border-border">
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
      <p>
        This is your User Menu. There is nothing much here other than the sign
        out button, but I will add stuff later.
      </p>
      <SignOutButton />
    </div>
  );
}

function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Sign Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            If you sign out, you will have to sign in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
