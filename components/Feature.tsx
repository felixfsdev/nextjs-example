import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

type FeatureProps = {
  image: StaticImageData;
  title: string;
  text?: string;
  children?: ReactNode;
  reverse?: boolean;
};

export default function Feature({
  image,
  title,
  text,
  children,
  reverse = false,
}: FeatureProps) {
  return (
    <section
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } w-full p-6`}
    >
      <div className="flex-1 flex justify-center items-center p-2">
        <Image
          src={image}
          alt="Image"
          className="object-contain w-full max-w-xs"
        />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-center items-center">
        <h2 className="text-3xl text-center pb-4">{title}</h2>
        {text && <p className="text-center">{text}</p>}
        {children}
      </div>
    </section>
  );
}
