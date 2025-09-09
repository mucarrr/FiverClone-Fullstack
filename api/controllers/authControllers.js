import bcrypt from "bcrypt";
import User from "../models/authModels.js";
import jwt from "jsonwebtoken";
import { upload } from "../utils/cloudinary.js";
import sendMail from "../utils/mailtrap.js";


const register = async (req, res, next) => {
    try{
        // console.log("Request body:", req.body);
        // console.log("Request body type:", typeof req.body);

        const hashedPassword = bcrypt.hashSync(req.body.password, 12);
        // console.log("Password hashed successfully");

        const photo = await upload(next, req.file.path, "profile-images", 200, 200, "fill", 90);
        console.log(photo);
        const photoUrl = photo.secure_url;
        req.body.photo = photoUrl;
        
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        })
        // console.log("User created:", newUser);
        
        User.password = undefined;
        res
        .status(201)
        .json({message: "User created successfully", user: newUser});
         
    }catch(err){
        // console.error("Error in register:", err);
        // console.error("Error stack:", err.stack);
        res.status(500).json({message: err.message});
    }
}
const login = async (req, res) => {
    try{
        console.log(req.body);
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(404).json({message: "User not found or wrong credentials"});
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "User not found or wrong credentials"});
        }
        const token = jwt.sign({id: user.id, isSeller: user.isSeller}, process.env.JWT_TOKEN, {expiresIn: "7d"});
         user.password = undefined;
        res
        .cookie("token", token, {httpOnly: true, sameSite: "strict"})
        .status(200)
        .json({message: "Login successful", user: user, token: token, isSeller: user.isSeller});
        //to send token in json is also important for applications (cookies are only for browsers)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const logout = async (req, res) => {
    try{
        res.clearCookie("token", {httpOnly: true, sameSite: "strict"}).json({message: "Logout successful"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const forgotPassword = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const resetToken = user.createPasswordResetToken();
        await user.save({validateBeforeSave: false});
        await sendMail(user.email, "Reset password link", `<p>Hi ${user.username}, Click <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">here</a> to reset your password</p>`);
        res.status(200).json({message: "Reset password link sent to email"});

    }catch(err){
        res.status(500).json({message: "Error in forgot password"});
    }
}

export { register, login, logout, forgotPassword };