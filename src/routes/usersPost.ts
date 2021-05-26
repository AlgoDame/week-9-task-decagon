import { Router, Request, Response, NextFunction } from 'express';
import validateOrg from "../controllers/validateOrg";
import orgModel from "../models/orgModel";
import authorizeUser from "../auth/authorization";


const router = Router();

/* POST users listing. */
router.post('/', authorizeUser, async function (req: Request, res: Response, next: NextFunction) {
  const result = await validateOrg(req.body);
  if (result.error) {
    return res.status(400).json({ "Error": result.error.message });
  }
 const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = req.body;
  let doc = await orgModel.create({
    organization,
    products,
    marketValue,
    address,
    ceo,
    country,
    noOfEmployees,
    employees
  });

  res.status(201).json({
    status: "Successful",
    data: doc
  });
});

export default router;
