import { Request, Response, NextFunction } from "express";
import { User as zodUser } from './users.models.js';
import { createUser, destroySession, userExits, authenticateUser, findUserBySession } from "./users.controlers.js";
import { createSession } from "../../utils/sessions.js";
import { User } from "@prisma/client";



export async function userSignUp(req: Request, res: Response) {

  let createdUser: User | null = await createUser(req.body as zodUser);
  if (!createdUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  
  
  let userSession = await createSession(createdUser);
  res.setHeader("Authorization", `Bearer ${userSession}`);
  res.json({ message: "User created" });
  
}
 

export async function userSignIn(req: Request, res: Response) {
  
  let UserIfExists = await userExits(req.body.email);
  if (!UserIfExists) {
    return res.status(404).json({ message: "User not found" });
  }
  let userAuthenticated = await authenticateUser(req.body.password, UserIfExists as User);
  if (!userAuthenticated){
    return res.status(401).json({ message: "email or password is incorrect" });
  }
  let userSession = await createSession(UserIfExists as User);
  res.setHeader("Authorization", `Bearer ${userSession}`);
  res.json({ message: "User logged" });


}

export async function userSignOut(req: Request, res: Response) {
  
  const status = await destroySession(req.body.session);
  if (status === 1) {
    return res.json({ message: "Session destroyed" });
  }else {
    return res.json({ message: "Session not found" });
  }
  

}

export async function userMe(req: Request, res: Response) {
  const userIfExists = await findUserBySession(req.body.session);
  if (!userIfExists) {
    return res.status(404).json({ message: "User not found" });
  }
  const user = userIfExists.user;

  res.json({ ...user });
  
}