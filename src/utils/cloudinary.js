import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;

    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file uploaded successfully
    // remove locally stored temp file on upload success
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // remove locally stored temp file on upload failure
    fs.unlinkSync(localFilePath);
  }
}

export { uploadOnCloudinary };
