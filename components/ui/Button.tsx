import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded py-1 px-4 cursor-pointer transition-all",
        "bg-primary hover:bg-primary-hover active:bg-primary-active text-on-primary",
        "disabled:bg-primary-disabled disabled:cursor-default",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
