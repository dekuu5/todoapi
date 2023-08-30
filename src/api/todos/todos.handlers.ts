import { Request, Response } from 'express';
import { findUserBySession } from '../users/users.controlers.js';
import { findTodosByUserId, CreateTodoWithUserId } from './todos.controllers.js';
import { Todo } from './todos.models.js';

export async function getUserTodos(req: Request, res: Response) {
  
  const userTodos = await findTodosByUserId(req.body.user);
  if (userTodos.length === 0) {
    return res.status(404).json({ message: "there is no todos for this user" });
  }
  const todos: Todo[]= userTodos.map((todo) => {
    const { createdAt, userID, ...rest } = todo;
    return rest;
  });
  return res.status(200).json({todos});
}

export async function createUserTodo(req: Request, res: Response) {
  const todo = await CreateTodoWithUserId(req.body.user.id, req.body);
  res.status(201).json({massage: "todo created"});
}

export async function updateUserTodo(req: Request, res: Response) {
}
export async function deleteUserTodo(req: Request, res: Response) {

}