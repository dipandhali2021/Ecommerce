import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "da9skd1ks",
  api_key: "187789145313252",
  api_secret: "hyQ63B3g_7b_nAzazS8okeAgZZY",
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
