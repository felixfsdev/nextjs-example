import { ReactNode } from "react";
import Image from "next/image";

type CardProps = {
  image?: string;
  title?: string;
  text?: string;
  children?: ReactNode;
};

export default function Card({ image, title, text, children }: CardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-bg rounded text-center border-border overflow-hidden">
      {image && (
        <Image
          src={image}
          alt="Image"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      )}
      <div>
        {title && <h1 className="text-xl">{title}</h1>}
        {text && <p>{text}</p>}
      </div>
      {children}
    </div>
  );
}
