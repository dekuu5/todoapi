import { Request, Response } from 'express';
import { findTodosByUserId, CreateTodoWithUserId, deleteTodoById, markTodoWithComplete } from './todos.controllers.js';
import { Todo } from './todos.models.js';

export async function getUserTodos(req: Request, res: Response) {
  
  const userTodos = await findTodosByUserId(req.body.user);
  if (userTodos.length === 0) {
    return res.status(200).json({todos: []});
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

export async function markUserTodoComplete(req: Request, res: Response) {
  const todoId = Number(req.params.id);
  const user = req.body.user;
  const status = await markTodoWithComplete(todoId, user.id);
  if (status === 0) {
    return res.status(400).json({message: "an error occurred"});
  }
  res.status(200).json({message: "todo marked as complete"});
}

export async function deleteUserTodo(req: Request, res: Response) {
  const todoId = Number(req.params.id);
  const user = req.body.user;
  const status = await deleteTodoById(todoId, user.id);
  if (status === 0) {
    return res.status(200).json({message: "already deleted"});
  }
  res.status(200).json({message: "todo deleted"});
}
