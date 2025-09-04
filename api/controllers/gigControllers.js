import Gig from "../models/gigModels.js";
import { upload } from "../utils/cloudinary.js";
const getGigs = async (req, res) => {
    const buildFilters = (query) =>{
        const filters = {};
        if(query.category){
            filters.category = query.category;
        }
        if(query._id){
            filters.user = query._id;
        }
        if(query.min || query.max){
            filters.packagePrice = {};
            if(query.min){
                filters.packagePrice.$gte = query.min;
            }
            if(query.max){
                filters.packagePrice.$lte = query.max;
            }
        }
        if(query.search){
            filters.title = { $regex: query.search, $options: "i" }; //insensitive search a A
        }
        return filters;
    }
    try{
        const gigs = await Gig.find(buildFilters(req.query)).populate("user", "username photo");
        if(gigs.length === 0){
            return res.status(404).json({message: "No gigs found"});
        }
        res.json(gigs);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const createGig = async (req, res, next) => {
    try{
        // console.log(req.body);
        const isSeller = req.isSeller;
        if(!isSeller){
            return res.status(401).json({message: "You are not authorized to create a gig"});
        }
        const coverImage = await upload(next, req.files.coverImage[0].path, "gig-images", 900, 600, "fill", 90);
        console.log(coverImage);
        const coverImageUrl = coverImage.secure_url;
        req.body.coverImage = coverImageUrl;
        
        const promises = req.files.images.map((image)=>upload(next, image.path, "gig-images", 900, 600, "fill", 90));
        // console.log(images, "promises");

        const images = await Promise.allSettled(promises);
        req.body.images = images.map((image)=>image.value.secure_url);
        console.log(req.body);
        const newGig = await Gig.create({...req.body, user: req._id});
        res.json({message: "Gig created successfully", gig: newGig});
        
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getGig = async (req, res) => {
        try{
            const gig = await Gig.findById(req.params.id).populate("user", "username photo country phone email description createdAt");
        if(!gig){
            return res.status(404).json({message: "Gig not found"});
        }
        res.json({message: "Gig fetched successfully", gig});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateGig = async (req, res) => {
    try{
        res.json({message: "Gig updated successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const deleteGig = async (req, res) => {
    try{
        res.json({message: "Gig deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export { getGigs, createGig, getGig, updateGig, deleteGig };