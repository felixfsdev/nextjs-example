"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../../../components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import UserMenu from "./user-menu";

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
        <div className="relative flex items-center justify-start bg-card md:border-b border-border md:bg-card/90 md:backdrop-blur p-2 z-10">
          <Link href="/" className="text-2xl font-bold font-heading">
            Next.js Example
          </Link>

          <ul className="hidden md:flex md:items-center mx-2">
            <NavContents />
          </ul>
          <div className="flex gap-4 ml-auto items-center">
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
          <ul className="flex flex-col p-2 pt-0">
            <NavContents />
          </ul>
        </div>
      </div>

      <NavOverlay
        className={cn("z-5", { [open ? "opacity-100" : "opacity-0"]: true })}
      />
    </nav>
  );
}

function NavContents() {
  return (
    <>
      <Link href="/home">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link href="/test">
        <Button variant="ghost">Test</Button>
      </Link>
    </>
  );
}

function NavOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 md:hidden bg-black/10 backdrop-blur-xs transition-all duration-300",
        className,
      )}
    ></div>
  );
}
