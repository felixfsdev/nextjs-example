"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../../../components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 w-full p-2 border-b border-border bg-background md:bg-background/90 md:backdrop-blur z-50">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl">
          Next.js Example
        </Link>

        <div className="flex gap-4 items-center">
          <ul className="hidden md:flex md:items-center gap-4">
            <NavContents />
          </ul>

          <ModeToggle />
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <SessionProvider>
            <UserMenu />
          </SessionProvider>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 overflow-hidden mt-2 transition-all duration-300 md:hidden border-b border-border bg-background ${
          open ? "max-h-60 pt-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-2">
          <NavContents />
        </ul>
      </div>
    </nav>
  );
}

function NavContents() {
  return (
    <>
      <NavLink href="/home">Home</NavLink>
      <NavLink href="/wip">WIP</NavLink>
      <NavLink href="/test">Tests</NavLink>
      <SignOutButton />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="hover:underline underline-offset-4 active:text-muted-foreground"
    >
      {children}
    </Link>
  );
}

function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sign Out</Button>
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

function UserMenu() {
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
            className="w-7 rounded-full"
          />
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>User actions</DrawerTitle>
          <DrawerDescription>A lkav ko iw lakj wie oiae.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
