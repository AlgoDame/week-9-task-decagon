import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import validateSignup from "../controllers/validateSignUp";
import User from "../models/userModel";
import { generateToken } from "../auth/token";
import { HttpError } from 'http-errors'

const router = Router();
router.post("/", async function (req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let result = await validateSignup(body);

    if (result.error) { return res.status(400).json({ Error: result.error.message }) };
    let { firstname, lastname, email, password } = body;
    let hashedPassword = await bcrypt.hash(password, 10);
    let doc = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
    })
    doc.save()
        .then((data: any) => {
            res.status(201).send(doc)
        })
        .catch((error: HttpError) => {
            if (error.code === 11000) {
                res.status(400).json({message: "Email is taken"})
            }
        })
    let id = doc._id;
    let token = generateToken(id);
    return res.status(201).json({
        status: "Successful",
        token,
        data: doc
    })

})
export default router;

