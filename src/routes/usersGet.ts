import { Router, Request, Response, NextFunction } from 'express';
import orgModel from "../models/orgModel";
import authorizeUser from "../auth/authorization";
const router = Router();

/* GET users listing. */
router.get('/', authorizeUser, async function (req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page) || 1;
    const limit: number = 5;
    const totalDocs: number = await orgModel.countDocuments();
    const prevPage = page === 1 ? null : page - 1;
    const nextPage = page * limit >= totalDocs ? null : page + 1;
    let data = await orgModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
    res.status(200).json({
        status: "successful",
        previous: prevPage,
        next: nextPage,
        data: data
    });
    


});

export default router;

