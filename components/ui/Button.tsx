"use client";

import { PropsWithChildren, ButtonHTMLAttributes, useState } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
  variant?: "primary" | "secondary";
  disableAfterClick?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  variant = "primary",
  disableAfterClick,
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  return (
    <button
      className={clsx(
        "flex justify-center items-center gap-2 rounded py-1 px-4 cursor-pointer transition-all",
        variant === "primary" &&
          "bg-primary hover:bg-primary-hover active:bg-primary-active text-on-primary disabled:bg-primary-disabled disabled:cursor-default",
        variant === "secondary" &&
          "bg-bg hover:bg-bg-hover border border-border disabled:text-text-muted",
        className,
      )}
      disabled={isDisabled}
      onClick={async (e) => {
        setIsDisabled(true);
        await onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
