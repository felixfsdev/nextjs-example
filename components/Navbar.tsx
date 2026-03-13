"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = (
  <>
    <Link href="/home">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/login">Login</Link>
    <Link href="/signup">Signup</Link>
  </>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-100 border-b ${
        atTop && !open && pathname === "/"
          ? "bg-transparent border-transparent p-4"
          : "bg-bg/70 backdrop-blur-md border-border p-2"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl">
          Next.js Example
        </Link>

        <ul className="hidden md:flex gap-6">{links}</ul>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden  ${
          open ? "max-h-60 mt-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-2">{links}</ul>
      </div>
    </nav>
  );
}
