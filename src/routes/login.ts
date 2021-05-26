import { Router, Request, Response, NextFunction } from "express";
import User from "../models/userModel"
import bcrypt from "bcrypt";
import { validateLogin } from "../controllers/validateLogin";
import { generateToken } from "../auth/token";
const router = Router();

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    let result = await validateLogin(req.body);
    if (result.error) {
        return res.status(400).json({Error: result.error.message})
    }
    
    const data = await User.findOne({ email: req.body.email })
    
    if (!data) {
        return res.status(404).json({
            status: 'Error',
            message: 'User not found',
            data: []
        })
    }
    const pass = await bcrypt.compare(req.body.password, data.password)

    if (!pass) {
        return res.status(404).json({
            status: 'Error',
            message: 'Email or password is invalid',
            data: []
        })
    }
    
    let id = data._id;
    let token = generateToken(id);
    return res.status(200).json({
        status: "Login successful",
        id,
        data: data.email,
        token
    })


})

export default router;