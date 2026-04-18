import { ReactNode } from "react";
import OpticalCenter from "./optical-center";

export default function ErrorPage({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <OpticalCenter>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold font-heading">{title || "Oops!"}</h1>
        <p className="text-muted-foreground">
          {description || "An error occurred"}
        </p>
      </div>
    </OpticalCenter>
  );
}
