import { Router, Request, Response, NextFunction } from "express";
import orgModel from "../models/orgModel";
import authorizeUser from "../auth/authorization"
const router = Router();
router.get("/:id", authorizeUser, async function (req: Request, res: Response, next: NextFunction) {
    if (!req.params) {
        return res.status(400).json({
            status: "Unsuccesful",
            message: "Id is required"
        })
    }

    let org = await orgModel.findById(req.params.id);
    return res.status(200).json({
        status: "Successful",
        data:org
    })
})

export default router;