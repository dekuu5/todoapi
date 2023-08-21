import { Request, Response, NextFunction } from "express";
import {user, User} from './users.models.js';
import { createUser } from "./users.controlers.js";



export async function userSignUp(req: Request, res: Response) {
  const body = req.body;
  try {
    let bodyValidated = await user.parseAsync(body);
    let createdUser = await createUser(bodyValidated);
    
    res.json(JSON.stringify(createdUser));
  }
  catch (e) {
    console.log(e);
  }
}
 