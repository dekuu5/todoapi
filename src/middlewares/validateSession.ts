import { Request, Response, NextFunction } from "express";


export async function validateSession(req: Request, res: Response, next: NextFunction) {
  const session = req.headers.authorization?.split(" ")[1];
  if (!session) {
    return res.status(401).json({ message: "Session not found" });
  }
  req.body.session = session;
  next();
}