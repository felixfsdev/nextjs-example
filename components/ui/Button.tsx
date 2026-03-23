"use client";

import { PropsWithChildren, ButtonHTMLAttributes, useState } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
  variant?: "primary" | "secondary";
  disableOnClick?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  variant = "primary",
  disableOnClick = false,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const [isDisabled, setIsDisabled] = useState(props.disabled ? true : false);

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
        if (disableOnClick) setIsDisabled(true);
        await onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
