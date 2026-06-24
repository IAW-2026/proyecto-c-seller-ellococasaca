//Upload Cloudinary Images for products.
import cloudinary from "@/src/lib/cloudinary/cloudinary";

export async function uploadImage(
  file: File,
  productId: string
) {
    //Parse file to buffer for Cloudinary upload.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<string>((resolve, reject) => {
        const uploadStream =
        cloudinary.uploader.upload_stream(
            {
            folder: `seller-app/products/${productId}`,
            },
            (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result!.secure_url);
            }
        );

        uploadStream.end(buffer);
    });
}