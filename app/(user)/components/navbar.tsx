"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../../../components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(containerRef, () => setOpen(false));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 w-full z-50">
      <div ref={containerRef}>
        <div className="relative flex items-center justify-between bg-card md:border-b border-border md:bg-card/90 md:backdrop-blur p-2 z-10">
          <Link href="/" className="text-2xl font-bold font-heading">
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
          className={`absolute left-0 z-8 right-0 overflow-hidden transition-[max-height,padding] duration-300 md:hidden border-b border-border bg-card ${
            open ? "max-h-60 pt-2" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-4 p-2 pt-0">
            <NavContents />
          </ul>
        </div>
      </div>

      <NavOverlay className={cn("z-5", { hidden: !open })} />
    </nav>
  );
}

function NavContents() {
  return (
    <>
      <NavLink href="/home">Home</NavLink>
      <NavLink href="/wip">WIP</NavLink>
      <NavLink href="/test">Tests</NavLink>
    </>
  );
}

function NavOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 md:hidden bg-black/10 backdrop-blur-xs",
        className,
      )}
    ></div>
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
            className="w-20 rounded-full"
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
