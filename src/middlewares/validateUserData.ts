import { Request, Response, NextFunction } from "express";
import { user } from '../api/users/users.models.js';


export async function validateUserData(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  try {
    const bodyValidated = await user.parseAsync(body);
    req.body = bodyValidated;
    next();
  } 
  catch (e) {
    return res.status(400).json({ message: "Bad request" });
  }

}