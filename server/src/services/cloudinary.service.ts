import cloudinary from "../configs/cloudinary";

interface UploadOptions {
  folder: string;
  width?: number;
  height?: number;
}

export const uploadImage = (
  buffer: Buffer,
  options: UploadOptions
):Promise<{ url: string; publicId: string }> =>{
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: "image",
        transformation: options.width && options.height
          ? [{ width: options.width, height: options.height, crop: "fill" }]
          : undefined,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    ).end(buffer);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};
