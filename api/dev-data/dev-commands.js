import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Gig from "../models/gigModels.js";
import User from "../models/authModels.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gigs = JSON.parse(fs.readFileSync(`${__dirname}/gigs.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

dotenv.config();

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Connected to MongoDB komutları");
})
.catch((err) => {
    console.log(err, "MongoDB komutları bağlantı hatası");
});

const importData = async () => {
    try{
        await Gig.create(gigs, {validateBeforeSave: false});
        await User.create(users, {validateBeforeSave: false});
        console.log("Data imported successfully");
    }catch(err){
        console.log(err, "Data import failed");
    }
    process.exit();
}

const deleteData = async () => {
    try{
        await Gig.deleteMany();
        await User.deleteMany();
        console.log("Data deleted successfully");
    }catch(err){
        console.log(err, "Data delete failed");
    }
    process.exit();
}

console.log(process.argv, "process.argv");

if(process.argv[2] === "--import"){
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}