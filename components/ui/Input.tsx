import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx("p-1 rounded border border-border", className)}
      {...props}
    />
  );
}
