import {model, Schema} from "mongoose";

const gigSchema = new Schema({
    user : {
        type: Schema.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    title : {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description : {
        type: String,
        minlength: [10, "description must be at least 10 characters"],
        maxlength: [500, "description must be less than 500 characters"],
    },
   reviewCount: {
        type: Number,
        default: 0,
    },
    starCount : {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    coverImage: {
        type: String,
        required: [true, "Cover image is required"],
        default: "https://www.dakotapulse.com/wp-content/uploads/2022/01/fiverr-og-logo-1024x538.png",
    },
    images: {
        type: [String],
        required: [true, "Images are required"],
    },
    packageTitle: {
        type: String,
        required: [true, "Title is required"],
    },
    packageDescription: {
        type: String,
        required: [true, "Description is required"],
    },
    packagePrice: {
        type: Number,
        required: [true, "Price is required"],
    },
    packageDuration: {
        type: Number,
        required: [true, "Duration is required"],
    },
    packageFeatures: {
        type: [String],
        required: [true, "Features are required"],
    },
    packageRevision: {
        type: Number,
        required: [true, "Revision is required"],
    }
}, {timestamps: true});

const Gig = model("Gig", gigSchema);

export default Gig;