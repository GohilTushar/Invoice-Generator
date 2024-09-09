import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { imgObject } from "../config/image.constant.js";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from "../config/config.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function checkFileType(file) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file).toLowerCase());
  if (extname) return true;
  return false;
}

const generatePublicId = async (image) => {
  const imgObj = image;
  const pIdFull = imgObj.split("/");
  const pIdForImage = pIdFull[pIdFull.length - 1];
  const pIdWithExt = pIdForImage.split(".");
  return pIdWithExt[0];
};

const uploadOnCloudinary = async (localFilePath, fileName) => {
  try {
    const file = checkFileType(fileName);
    if (!file) {
      fs.unlinkSync(localFilePath);
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: imgObject.folder,
      resource_type: "auto",
    });

    console.log("file is uploaded on cloudinary ", response.secure_url);
    fs.unlinkSync(localFilePath);

    return response.secure_url;
  } catch (err) {
    console.log(err);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(
      `${imgObject.folder}/${publicId}`
    );
    console.log("File deleted from Cloudinary", response);
    return response;
  } catch (err) {
    console.error("Error deleting file from Cloudinary:", err);
    throw err;
  }
};

const updateProfilePhoto = async (localFilePath, fileName, publicId) => {
  try {
    await deleteFromCloudinary(publicId);
    const updated=await uploadOnCloudinary(localFilePath, fileName);
    return updated //variable assign
  } catch (err) {
    console.error("Error updating file from Cloudinary:", err);
    throw err;
  }
};

export {
  uploadOnCloudinary,
  deleteFromCloudinary,
  updateProfilePhoto,
  generatePublicId,
};
