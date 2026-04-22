"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateImage, cropImageToSquare, createPreviewUrls } from "./image";
import { uploadProfileImage } from "./uploadProfileImage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Preview = {
  originalUrl: string;
  croppedUrl: string;
  file: File;
};

export default function UploadProfileImageButton() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    return () => {
      if (!preview) return;
      URL.revokeObjectURL(preview.originalUrl);
      URL.revokeObjectURL(preview.croppedUrl);
    };
  }, [preview]);

  async function onFile(file: File) {
    const validationError = validateImage(file);
    if (validationError) return setError(validationError);

    setError(null);

    try {
      const originalUrl = URL.createObjectURL(file);
      const cropped = await cropImageToSquare(originalUrl, file.type);

      const { croppedUrl } = createPreviewUrls(file, cropped);

      setPreview({
        originalUrl,
        croppedUrl,
        file: new File([cropped], file.name, { type: file.type }),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed");
    }
  }

  function submit() {
    if (!preview) return;

    startTransition(async () => {
      try {
        await uploadProfileImage(preview.file);
        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      }
    });
  }

  function reset() {
    setPreview(null);
    setError(null);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <Camera className="mr-2 size-4" />
          Upload Profile Image
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Profile Image</DialogTitle>
          <DialogDescription>
            JPEG, PNG, WebP supported. The image will be cropped to a square.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isPending}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onFile(f);
          }}
        />

        {preview && (
          <div className="flex justify-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-muted">
              <Image src={preview.croppedUrl} fill alt="" />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={submit} disabled={!preview || isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
