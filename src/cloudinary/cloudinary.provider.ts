// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDNAIRY_CLOUD_NAME,
      api_key: process.env.CLOUDNAIRY_API_KEY,
      api_secret: process.env.CLOUDNAIRY_API_SECRET,
    });
  },
};
