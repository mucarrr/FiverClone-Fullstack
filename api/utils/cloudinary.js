import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dx58rszwm', 
        api_key: '558135827777163', 
        api_secret: process.env.CLOUDINARY_SECRET 
    });
    
const upload = async (
    next,
    file_path,
    folder,
    width,
    height,
    crop,
    quality,
    type
) => {
    return await cloudinary.uploader.upload(file_path, {
        folder: folder,
        resource_type: type,
        width: width,
        height: height,
        crop: crop,
        quality: quality,
    },
(error) => {
    if(error){
        return next(new Error("Image upload failed"));
    }
});
}

export { upload };