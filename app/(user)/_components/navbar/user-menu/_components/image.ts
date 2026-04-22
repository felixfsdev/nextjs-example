const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_CROPPED_SIZE_BYTES = 100 * 1024;

export function validateImage(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Invalid file type. Only JPEG, PNG, and WebP are allowed.";
  }
  return null;
}

export function cropImageToSquare(
  imageUrl: string,
  fileType: string,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const size = Math.min(image.width, image.height);
      const outputSize = Math.min(size, 200);

      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas unavailable"));

      ctx.drawImage(
        image,
        (image.width - size) / 2,
        (image.height - size) / 2,
        size,
        size,
        0,
        0,
        outputSize,
        outputSize,
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          if (blob.size > MAX_CROPPED_SIZE_BYTES) {
            return reject(new Error("Cropped image exceeds 100 KB limit"));
          }
          resolve(blob);
        },
        fileType,
        0.7,
      );
    };

    image.onerror = () => reject(new Error("Image load failed"));
    image.src = imageUrl;
  });
}

export function createPreviewUrls(file: File, blob: Blob) {
  return {
    originalUrl: URL.createObjectURL(file),
    croppedUrl: URL.createObjectURL(blob),
  };
}
