"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import UserMenu from "./user-menu";
import features from "../../config/feature";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();

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
        <div className="relative flex items-center justify-start bg-card border-b md:bg-card/90 md:backdrop-blur p-2 z-10">
          <Link href="/" className="text-lg md:text-2xl font-bold font-heading">
            Next.js Example
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
      <Link href="/">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost">About</Button>
      </Link>
      <FeaturesDropdown className="hidden md:block" />
      <div className="md:hidden flex flex-col p-2.5">
        <h1 className="font-heading text-lg font-bold mb-2">Features</h1>
        {features.map((card) => (
          <Link key={card.title} className="pl-2" href={String(card.href)}>
            <Button variant="ghost">{card.title}</Button>
          </Link>
        ))}
      </div>

      <Link href="/privacy-policy">
        <Button variant="ghost">Privacy Policy</Button>
      </Link>
    </>
  );
}

function FeaturesDropdown({ className }: { className?: string }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setOpenMenu(false));

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <Button
        variant="ghost"
        onClick={() => setOpenMenu(!openMenu)}
        className="flex items-center gap-1"
      >
        Features
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", {
            "rotate-180": openMenu,
          })}
        />
      </Button>

      {openMenu && (
        <div className="fixed left-2 mt-1 md:absolute md:left-0 md:mt-4 w-70 bg-card border rounded-md shadow-lg p-2 z-50">
          {features.map((card) => (
            <Link
              key={card.title}
              onClick={() => {
                setOpenMenu(false);
              }}
              href={card.href || "#"}
            >
              <div
                className={cn(
                  "px-3 py-2 rounded hover:bg-accent transition-colors cursor-pointer",
                  !card.href && "opacity-50 cursor-not-allowed",
                )}
              >
                <div className="font-medium text-sm">{card.title}</div>
                {card.description && (
                  <div className="text-xs text-muted-foreground">
                    {card.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
