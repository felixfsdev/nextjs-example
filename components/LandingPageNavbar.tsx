"use client";

import { useState } from "react";

export default function LandingPageNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-white p-2 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <a href="/" className="text-2xl">
          Next.js Example
        </a>

        <ul className="hidden md:flex gap-6">
          <a href="/">Home</a>
          <a href="">Stuff</a>
          <a href="">More stuff</a>
        </ul>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 bg-white overflow-hidden mt-2 transition-all duration-300 md:hidden border-b border-gray-300 ${
          open ? "max-h-40 pt-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-2">
          <a href="/">Home</a>
          <a href="">Stuff</a>
          <a href="">More stuff</a>
        </ul>
      </div>
    </nav>
  );
}
