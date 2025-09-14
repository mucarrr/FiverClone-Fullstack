
import User from "../models/authModels.js";
import jwt from "jsonwebtoken";
import { upload } from "../utils/cloudinary.js";
import sendMail from "../utils/mailtrap.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import c from "../utils/catchAsync.js";


const register = c(async (req, res, next) => {
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
        })

const login = c(async (req, res, next) => {
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
})
const logout = c(async (req, res, next) => {
    res.clearCookie("token", {httpOnly: true, sameSite: "strict"}).json({message: "Logout successful"});
})
const forgotPassword = c(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const resetToken = user.createPasswordResetToken();
        await user.save({validateBeforeSave: false});
        await sendMail(user.email, 
            "Reset password link", 
            `<p>Hi ${user.username}, Click here to reset your password</p>
            <a href=http://localhost:5173/reset-password/${resetToken}>Reset password</a>`);
        res.status(200).json({message: "Reset password link sent to email"});

})

const resetPassword = c(async (req, res, next) => {
    if(req.body.password !== req.body.passwordConfirm){
        return res.status(400).json({message: "Passwords do not match"});
    }
    
    const hashedPassword = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({passwordResetToken: hashedPassword, passwordResetTokenExpires: {$gt: Date.now()}});
    if(!user){
        return res.status(404).json({message: "Invalid or expired token"});
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.password = bcrypt.hashSync(user.password, 12); 
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();
    res.status(200).json({message: "Password reset successfully"});
})
export { register, login, logout, forgotPassword, resetPassword };