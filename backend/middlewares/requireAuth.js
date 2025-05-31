import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { useState } from "react";
dotenv.config();

//? verify Authentication
const requireAuth = async (req, resp, next) => {
    /* 
    ? Grab the Authorization Header
        - This should contain something like: Bearer <JWT_TOKEN_HERE>     
    */
    const { authorization } = req.headers;

    //? if header does not exist then stop here
    if(!authorization) {
        // return resp.status(401).json({error: "Authorization token reqired."});
        return resp.status(401).json({error: "Permission denied, Log-in kariye maharaj!"});
    }

    /*  
    ? Extract the Token
        - The header is “Bearer <token>”, so split by space and take the second part
    */ 
    const token = authorization.split(" ")[1];

    try {
        //? if token is verified then grab the ID form the token
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);

        /* 
        ? Attach User to the Request
            - Look up the `user` in your database by the `ID` from the token.
            - Attach a minimal `user` object to the request (req.user), so later handlers know who’s making the request.
        */
        req.userid = await User.findOne({_id}).select('_id');

        next();
    }
    catch(error) {
        console.log(error);
        resp.status(401).json({error: "Request not authorized"});
    }

    return error;
}

export default requireAuth;
