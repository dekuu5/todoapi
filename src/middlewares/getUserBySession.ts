import { Request, Response, NextFunction } from "express";
import { findUserBySession } from "../api/users/users.controlers.js";

export async function getUserBySession(req: Request, res: Response, next: NextFunction) {
  const user = await findUserBySession(req.body.session);
  console.log(user);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.body.user = user;
  next();
}