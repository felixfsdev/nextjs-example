"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const LIGHT_ONLY_ROUTES = ["/"];

export default function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Ran");
    const html = document.documentElement;

    if (LIGHT_ONLY_ROUTES.includes(pathname)) {
      html.classList.remove("dark");
      html.classList.add("light");
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    html.classList.toggle("dark", prefersDark);
    html.classList.toggle("light", !prefersDark);
  }, [pathname]);

  return null;
}
