import {model, Schema} from "mongoose";
import validator from "validator";
import crypto from "crypto";

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
    passwordConfirm: {
        type: String,
        required: [true, "Passwords are not the same"],
        validate: [validator.isStrongPassword, "Password is not strong enough"],
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
    },
    passwordResetToken: {
        type: String,
    },
   passwordResetAt: {
    type: Date,
   },
   passwordResetTokenExpires: {
    type: Date,
   }
}, {timestamps: true});


userSchema.pre("save", function(next){
    this.passwordConfirm = undefined;
    next();
});
userSchema.pre("save", function(next){
    if(!this.isModified("password") || this.isNew){
        return next();
    }
    this.passwordResetAt = Date.now() - 2000;
    next();
});
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
const User = model("User", userSchema);

export default User;