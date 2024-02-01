import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "dotenv";

config({
  path: "./.env",
});

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || "";
const api_key = process.env.CLOUDINARY_API_KEY || "";
const api_secret = process.env.CLOUDINARY_API_SECRET || "";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const uploadOnCloudinary = async (
  localFilePath: string,
  folderName: string
) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
      use_filename: true,
      unique_filename: false,
    });
    //delete the file from local storage
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
