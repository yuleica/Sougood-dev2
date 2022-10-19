import { Cloudinary } from "@cloudinary/url-gen";


//export const API_URL = "http://ec2-44-211-172-239.compute-1.amazonaws.com:8000/api";
//export const API_URL = "http://192.168.100.9:8000/api";
export const CLOUD_NAME = "cooperatica-ispirare";
export const CLOUDINARY_UPLOAD_PRESET = "lvgnvqn2";
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
export const API_URL = "https://d3kytn6bm49k3o.cloudfront.net/api";
export const CloudService = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME
  }
});


