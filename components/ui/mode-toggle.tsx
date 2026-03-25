"use client";

import * as React from "react";
import { Moon, Sun, Contrast } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun
            className={cn(
              "h-5 w-5 transition-all duration-300",
              mounted && theme === "light"
                ? "scale-100 rotate-0"
                : "scale-0 rotate-90",
            )}
          />
          <Moon
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              mounted && theme === "dark"
                ? "scale-100 rotate-0"
                : "scale-0 -rotate-90",
            )}
          />
          <Contrast
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              mounted && theme === "system"
                ? "scale-100 rotate-0"
                : "scale-0 rotate-90",
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(theme === "light" && "bg-accent")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(theme === "dark" && "bg-accent")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(theme === "system" && "bg-accent")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
