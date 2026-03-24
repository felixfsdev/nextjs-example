"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";

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
    <ModeToggle />
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </Button>
  </>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 w-full p-2 border-b border-border bg-bg md:bg-bg/90 md:backdrop-blur">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl">
          Next.js Example
        </Link>

        <ul className="hidden md:flex md:items-center gap-6">{navContents}</ul>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 overflow-hidden mt-2 transition-all duration-300 md:hidden border-b border-border bg-bg ${
          open ? "max-h-60 pt-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-2">{navContents}</ul>
      </div>
    </nav>
  );
}
