import axios from "axios";
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from "../config/config";

export const uploadImage = async (file: File): Promise<string> => {
  let imageUrl = ""
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData);
    imageUrl = response.data.public_id;
  } catch (error: any) {
    console.log(`Error: ${error.message}`)
  }

  return imageUrl;
}