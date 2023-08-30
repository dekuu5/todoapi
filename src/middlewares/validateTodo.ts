import { todoSchema } from "../api/todos/todos.models.js";
import { Request, Response, NextFunction } from 'express';


export async function validateTodo(req: Request, res: Response, next: NextFunction) {
  try {
  const parseBody = todoSchema.parse(req.body);
  req.body = parseBody;
  
  } catch (error) {
    return res.status(400).json({ message: "invalid data" });
  }
  next();
}
