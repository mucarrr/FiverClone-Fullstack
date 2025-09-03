import Gig from "../models/gigModels.js";
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
        res.json({message: "Gigs fetched successfully", gigs});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const createGig = async (req, res) => {
    try{
        // console.log(req.body);
        const isSeller = req.isSeller;
        if(!isSeller){
            return res.status(401).json({message: "You are not authorized to create a gig"});
        }
        const newGig = await Gig.create({...req.body, user: req._id});
        res.json({message: "Gig created successfully", gig: newGig});
        }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getGig = async (req, res) => {
    try{
        res.json({message: "Gig fetched successfully"});
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