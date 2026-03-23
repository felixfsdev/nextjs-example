import { PropsWithChildren, ButtonHTMLAttributes, useState } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
  disableAfterClick?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  disableAfterClick,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const [used, setUsed] = useState(false);

  return (
    <button
      className={clsx(
        "rounded py-1 px-4 cursor-pointer transition-all",
        "bg-primary hover:bg-primary-hover active:bg-primary-active text-on-primary",
        "disabled:bg-primary-disabled disabled:cursor-default",
        className,
      )}
      onClick={(e) => {
        if (disableAfterClick && used) return;
        if (disableAfterClick) setUsed(true);
        onClick?.(e);
      }}
      disabled={props.disabled || (disableAfterClick && used)}
      {...props}
    >
      {children}
    </button>
  );
}
