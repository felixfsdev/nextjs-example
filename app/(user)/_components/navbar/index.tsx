"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { House, Menu, X } from "lucide-react";
import Link from "next/link";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import UserMenu from "./user-menu";
import { AnimatePresence, motion } from "framer-motion";

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
        <div className="relative flex items-center justify-start bg-card border-b md:bg-card/90 md:backdrop-blur p-2 px-3 z-10">
          <Link href="/" className="text-lg md:text-2xl font-bold font-heading">
            <House className="h-6 w-6" />
          </Link>

          <ul className="hidden md:flex md:items-center mx-2">
            <NavContents />
          </ul>
          <div className="flex gap-2 ml-auto items-center">
            <ModeToggle />
            <Button
              variant="outline"
              className="md:hidden"
              size="icon"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <SessionProvider>
              <UserMenu />
            </SessionProvider>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, transform: "translateY(-30px)" }}
              animate={{ height: "auto", transform: "translateY(0)" }}
              exit={{ height: 0, transform: "translateY(-30px)" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="absolute inset-x-0 z-8 overflow-hidden border-b bg-card md:hidden"
            >
              <ul className="flex flex-col p-2 pb-4">
                <NavContents />
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-xs"
          ></motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavContents() {
  return (
    <>
      <Link href="/post">
        <Button variant="ghost">Read Posts</Button>
      </Link>
      <Link href="/post/create">
        <Button variant="ghost">Create Post</Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost">About</Button>
      </Link>
      <Link href="/privacy-policy">
        <Button variant="ghost">Privacy Policy</Button>
      </Link>
    </>
  );
}
