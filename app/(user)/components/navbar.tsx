"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../../../components/ui/mode-toggle";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import UserMenu from "./user-menu";
import { features } from "../config/navigation";

export default function Navbar() {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(containerRef, () => setOpen(false));

  useEffect(() => {
    if (open) {
      setOverlayVisible(true);
    } else {
      setTimeout(() => setOverlayVisible(false), 300);
    }
  }, [open]);

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
            {!session ? (
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            ) : (
              <SessionProvider>
                <UserMenu />
              </SessionProvider>
            )}
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

      {overlayVisible && (
        <NavOverlay
          className={cn("z-5", {
            [open ? "opacity-100" : "opacity-0"]: true,
          })}
        />
      )}
    </nav>
  );
}

function NavContents() {
  return (
    <>
      <Link href="/home">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost">About</Button>
      </Link>
      <FeaturesDropdown />
      <Link href="/news">
        <Button variant="ghost">News</Button>
      </Link>
      <Link href="/test">
        <Button variant="ghost">Test</Button>
      </Link>
    </>
  );
}

function FeaturesDropdown() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setOpenMenu(false));

  return (
    <div ref={menuRef} className="relative">
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
        <div className="fixed left-2 mt-1 md:absolute md:left-0 md:mt-4 w-70 bg-card border border-border rounded-md shadow-lg p-2 z-50">
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
