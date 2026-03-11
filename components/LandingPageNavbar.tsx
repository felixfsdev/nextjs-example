"use client";

import { useState } from "react";
import ExternalLink from "./ExternalLink";

export default function LandingPageNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-white p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Next.js Example</h1>

        <ul className="hidden md:flex gap-6">
          <ExternalLink href="/">Home</ExternalLink>
          <ExternalLink href="">Stuff</ExternalLink>
          <ExternalLink href="">More stuff</ExternalLink>
        </ul>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-40 opacity-100 pt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <ExternalLink href="/">Home</ExternalLink>
          <ExternalLink href="">Stuff</ExternalLink>
          <ExternalLink href="">More stuff</ExternalLink>
        </ul>
      </div>
    </nav>
  );
}
