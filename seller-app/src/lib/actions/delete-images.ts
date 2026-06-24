//Delete Cloudinary Images for products.
import cloudinary from "@/src/lib/cloudinary/cloudinary";

export async function deleteImage(
  imageUrl: string
) {
  const parts = imageUrl.split("/");

  const folderIndex =
    parts.findIndex(
      (part) => part === "seller-app"
    );

  if (folderIndex === -1) {
    throw new Error(
      "Invalid Cloudinary URL"
    );
  }

  const publicId =
    parts
      .slice(folderIndex)
      .join("/")
      .replace(/\.[^/.]+$/, "");

  await cloudinary.uploader.destroy(
    publicId
  );
}