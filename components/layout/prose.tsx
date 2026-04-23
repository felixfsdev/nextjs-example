import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function StandardContainer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col w-full max-w-5xl mx-auto p-4", className)}
    >
      {children}
    </div>
  );
}

export function Prose({ children }: { children?: ReactNode }) {
  return <div className="prose dark:prose-invert max-w-none">{children}</div>;
}
