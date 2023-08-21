import { Request, Response, NextFunction } from "express";
import { user } from './users.models.js';
import { createUser, destroySession } from "./users.controlers.js";
import { createSession } from "../../utils/sessions.js";
import { User } from "@prisma/client";



export async function userSignUp(req: Request, res: Response) {
  const body = req.body;
  try {
    let bodyValidated = await user.parseAsync(body);
    let createdUser: User | null = await createUser(bodyValidated);
    if (!createdUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    let userSession = await createSession(createdUser);
    res.setHeader("Authorization", `Bearer ${userSession}`);
    res.json({ message: "User created" });
  }
  catch (e) {
    console.log(e);
  }
}
 

export async function userSignIn(req: Request, res: Response) {




}

export async function userSignOut(req: Request, res: Response) {
  const session = req.headers.authorization?.split(" ")[1];
  console.log(session);
  if (!session) {
    return res.json({ message: "Session not found" });
  }
  const status = await destroySession(session);
  if (status === 1) {
    return res.json({ message: "Session destroyed" });
  }else {
    return res.json({ message: "Session not found" });
  }
  

}

export async function userMe(req: Request, res: Response) {

}