import { Router, Request, Response, NextFunction } from 'express';
import authorizeUser from "../auth/authorization";
import orgModel from "../models/orgModel";

const router = Router();

/* DELETE users listing. */
router.delete('/:id', authorizeUser, async function (req: Request, res: Response, next: NextFunction) {
    if (!req.params) {
        return res.status(400).json({
            status: "Unsuccesful",
            message: "Id is required"
        })
    };

    let org = await orgModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        status: "Successful",
        data: org
    });
});

export default router;
