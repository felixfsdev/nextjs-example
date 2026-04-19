"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateProfileImage } from "../actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";

export default function UploadProfileImageButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const cropImageToSquare = (
    imageUrl: string,
    fileType: string,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;

        // Downscale to 200x200 for profile pictures
        const maxDimension = 200;
        const canvasSize = Math.min(size, maxDimension);

        const canvas = document.createElement("canvas");
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          size,
          size,
          0,
          0,
          canvasSize,
          canvasSize,
        );
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          fileType,
          0.7, // 70% quality to reduce file size
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
        );
        return;
      }

      setError(null);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);

      const maxSize = 100 * 1024;
      try {
        const croppedBlob = await cropImageToSquare(previewUrl, file.type);

        // Validate cropped file size
        if (croppedBlob.size > maxSize) {
          setError(
            "Cropped image too large. Maximum size is 100KB. Try a smaller image.",
          );
          return;
        }

        const croppedFile = new File([croppedBlob], file.name, {
          type: file.type,
        });
        setSelectedFile(croppedFile);
        setCroppedPreviewUrl(URL.createObjectURL(croppedBlob));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process image",
        );
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to upload image");
        }

        const data = await response.json();
        await updateProfileImage(data.url);
        setOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        setCroppedPreviewUrl(null);
        window.location.reload();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to upload image");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <Camera className="mr-2 size-4" />
          Upload Profile Image
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="upload-image-description">
        <DialogHeader>
          <DialogTitle>Upload Profile Image</DialogTitle>
          <DialogDescription id="upload-image-description">
            Choose a new profile image. JPEG, PNG and WebP are supported. The
            image will be cropped to a square.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={isPending}
          />

          {croppedPreviewUrl && (
            <div className="flex justify-center">
              <div className="relative w-24 h-24 bg-muted rounded-full border overflow-hidden">
                <Image
                  src={croppedPreviewUrl}
                  fill
                  alt="Preview"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={!selectedFile || isPending}>
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
