import mongoose from "mongoose";

//? create a Schema
const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        min: 6,
        max: 30
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 30
    }
})

//? create a model
const User = mongoose.model("user", userSchema);

//? export model
export default User;