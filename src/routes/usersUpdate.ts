import { Router, Request, Response, NextFunction } from 'express';
import { validateUpdate } from '../controllers/validateUpdate';
import orgModel from "../models/orgModel";


const router = Router();

/* UPDATE users listing. */
router.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
        return res.status(400).json({
            status: "Unsuccesful",
            message: "Id is required"
        })
    };
    
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: "Unsuccessful",
            message: "Data must not be empty"
        })
    };

    const id: string = req.params.id;
    let result = await validateUpdate(req.body);
    if (result.error) {
        return res.status(400).json({
            status: "Error",
            message: result.error
        })
    }
    const data = await orgModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!data) {
        return res.status(404).json({
            status: "Unsuccessful",
            message: "Organization not found"
        })
    };
    return res.status(200).json({
        status: "Successful",
        data
    })
    
    
});

export default router;
