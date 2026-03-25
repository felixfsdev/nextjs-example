"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../../../../components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { UserMenu } from "./user-menu";
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

const navContents = (
  <>
    <Link
      className="hover:text-muted-foreground transition-all duration-200"
      href="/home"
    >
      Home
    </Link>
    <Link className="hover:text-muted-foreground transition-all" href="/wip">
      WIP
    </Link>
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
  </>
);

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
            {navContents}
          </ul>

          <ModeToggle />
          <button
            className="inline-flex items-center justify-center rounded-md text-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
        <ul className="flex flex-col gap-4 p-2">{navContents}</ul>
      </div>
    </nav>
  );
}
