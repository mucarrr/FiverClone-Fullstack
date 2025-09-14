import Gig from "../models/gigModels.js";
import { upload } from "../utils/cloudinary.js";
import c from "../utils/catchAsync.js";
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
    c(async (req, res, next) => {
        const gigs = await Gig.find(buildFilters(req.query)).populate("user", "username photo");
        if(gigs.length === 0){
            return res.status(404).json({message: "No gigs found"});
        }
        res.json(gigs);
    })
}

const createGig = c(async (req, res, next) => {
    try {
        // console.log("Request body:", req.body);
        // console.log("Request files:", req.files);
        
        const isSeller = req.isSeller;
        if(!isSeller){
            return res.status(401).json({message: "You are not authorized to create a gig"});
        }
        
        if(!req.files || !req.files.coverImage || !req.files.coverImage[0]){
            return res.status(400).json({message: "Cover image is required"});
        }
        
        const coverImage = await upload(next, req.files.coverImage[0].path, "gig-images", 900, 600, "fill", 90);
        console.log(coverImage);
        const coverImageUrl = coverImage.secure_url;
        req.body.coverImage = coverImageUrl;
        
        if(req.files.images && req.files.images.length > 0){
            const promises = req.files.images.map((image)=>upload(next, image.path, "gig-images", 900, 600, "fill", 90));
            const images = await Promise.allSettled(promises);
            req.body.images = images.map((image)=>image.value.secure_url);
        }
        
        console.log("Final body:", req.body);
        const newGig = await Gig.create({...req.body, user: req._id});
        res.json({message: "Gig created successfully", gig: newGig});
    } catch (error) {
        console.error("Create gig error:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({message: messages.join(', ')});
        }
        res.status(500).json({message: "Error creating gig", error: error.message});
    }
})
    

const getGig = c(async (req, res, next) => {
    const gig = await Gig.findById(req.params.id).populate("user", "username photo country phone email description createdAt");
        if(!gig){
            return res.status(404).json({message: "Gig not found"});
        }
        res.json({message: "Gig fetched successfully", gig});
})

const updateGig = c(async (req, res, next) => {
        const gig = await Gig.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!gig){
            return res.status(404).json({message: "Gig not found"});
        }
        res.json({message: "Gig updated successfully"});
    
})

const deleteGig = c(async (req, res, next) => {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if(!gig){
        return res.status(404).json({message: "Gig not found"});
    }
        res.json({message: "Gig deleted successfully"});
})
export { getGigs, createGig, getGig, updateGig, deleteGig };