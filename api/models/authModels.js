import {model, Schema} from "mongoose";

const userSchema = new Schema({
    username : {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    photo : {
        type: String,
        default: "https://c1.tablecdn.com/pa/random-user-api.jpg",
    },
    country : {
        type: String,
        required: [true, "Country is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
    },
    isSeller : {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
    },
    description: {
        type: String,
    }
}, {timestamps: true});

const User = model("User", userSchema);

export default User;