import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

async function authorizeUser(req:Request, res:Response, next:NextFunction) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: "Unsucessful",
            message: "You are not authorized to access this resource"
        })
    }
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({
            status: "Unsucessful",
            message: "You are not authorized to access this resource"})
    }
    const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return res.status(404).json({
            status: "Unsuccesful",
            message: "You are not authorized to access this resource"
        })
    }
    next();

}
export default authorizeUser;