"use client";

import { Article, ArticleContainer } from "@/components/layout/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export default function PlaygroundPage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  return (
    <ArticleContainer>
      <Article>
        <h1>Image input</h1>
        <p>
          <code>&lt;Input /&gt;</code> can accept files as well as text.
        </p>

        <h2>Accepting files</h2>
        <p>
          An <code>&lt;Input /&gt;</code> of type <code>file</code> stores an
          object of type <code>FileList</code>, which contains objects of type{" "}
          <code>File</code>. The first file can be accessed by{" "}
          <code>inputElement.files[0]</code>. Optionally, you can restrict the
          types of files that can be selected using the <code>accept</code>{" "}
          attribute.
        </p>
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="max-w-sm"
          aria-label="Select an image"
          onChange={(e) => {
            const file = e.target.files?.[0];

            setImgSrc((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return file ? URL.createObjectURL(file) : null;
            });
          }}
        />
        <p>
          This input has an <code>onChange</code> handler which generates a
          temporary local URL that points to the file data stored in memory (or
          a browser-managed temporary store) using{" "}
          <code>URL.createObjectURL(file)</code> and assigns it to the{" "}
          <code>imgSrc</code> state variable. Always use{" "}
          <code>(prev) =&gt; &#123;&#125;</code> for this purpose.
        </p>
        <p>
          It should be noted that every call to <code>URL.createObjectURL</code>{" "}
          allocates memory. You should revoke the previous URL using{" "}
          <code>URL.revokeObjectURL</code> before creating a new one in the{" "}
          <code>onChange</code> handler.
        </p>

        <h2>Previewing the image</h2>

        <p>
          The <code>src</code> attribute of the <code>Image</code> component is
          set to our <code>imgSrc</code> state variable. If it is{" "}
          <code>null</code>, then a placeholder box is displayed.
        </p>

        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="Preview"
            width={10}
            height={10}
            className="rounded-lg h-40 w-min border"
          />
        ) : (
          <div className="h-40 w-60 rounded-lg border flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No image selected</p>
          </div>
        )}
      </Article>
    </ArticleContainer>
  );
}
