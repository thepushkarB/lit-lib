// import mongoose from "mongoose";
import { use } from "react";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//* create JWT
export const genToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' });
}

//* signup
export const signupUser = async (req, resp) => {
    try {
        //? validation- check all fields
        if(!req.body.name || !req.body.email || !req.body.password) {
            return resp.status(400).json({ error: "All fields must be filled" });
            // throw Error("All fields must be filled");
        }
        //? validate email
        const validEmail = validator.isEmail(req.body.email);
        if(!validEmail) {
            return resp.status(400).json({ error: "Please enter valid email address" });
            // throw Error("Email is not valid");
        }
        //? validate passsowrd
        const validPassword = validator.isStrongPassword(req.body.password);
        if(!validPassword) {
            return resp.status(400).json({ error: "Password isn't strong enough" });
            // throw Error("Password ain't strong enough");
        }

        //? check if email exists in DB
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) {
            return resp.status(409).json({ error: "Email already exists" });
            // throw Error("Email already exist");
        }

        //* Rule: Always validate → then process → then respond 
    
        //? hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
    
        //? create obj
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        }
    
        //? add obj to DB
        const user = await User.create(newUser);
        // console.log(user);

        //? create jwt
        const token = genToken(user._id);

        //? send user data & token to client
        // resp.status(201).json({user, token});
        const userResp = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        resp.status(201).json({user: userResp, token});

    }
    catch(error) {
        console.log("Singup error:", error);
        // resp.status(400).send({msg: error.message});
        resp.status(500).json({ error: "Server error occurred" });
    }

}

//* login
export const loginUser = async (req, resp) => {
    // resp.json({msg: "log-in user"});

    try {
        //? validation
        if(!req.body.email || !req.body.password) {
            // resp.status(400).send("All fields must be filled");
            throw Error("All fields must be filled");
        }
        /* 
            since the user is trying to login we know for a fact that `email` & `password` is valid/legit(coz it's checked during Sign-up); 
            So no further validation needed
        */

        //? check if user exist in the DB
        const user = await User.findOne({email: req.body.email});
        // console.log(user);
        if(!user) {
            return resp.status(400).json({ error: "Incorrect email or password" });
            // throw Error("incorrect email");
        }

        //? match/compare hashed passwords
        // bcrypt includes a random salt in the hash output, ensuring that the same input produces different hashes each time
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) {
            return resp.status(400).json({ error: "Incorrect email or password" });
            // throw Error("incorrect password");
        }
        
        //? create jwt
        const token = genToken(user._id);

        // resp.status(200).json({user, token});
        const userResp = {
            _id: user._id, 
            name: user.name,
            email: user.email
        }
        resp.status(200).json({ user: userResp, token });

    }
    catch(error) {
        console.log("Login error:", error);

        //? If we reach here, it's usually server error (database down, code bug, etc.) hence status code `500`
        resp.status(500).json({ error: "Server error occurred" });

        // resp.status(500).send({ msg: error.message });
        /*
        ! ❌ this is bad response:
            ! exposes internal errors to client
            ! Could show: "MongoNetworkError: connection failed"
        */
    }
}