import { Router } from 'express';
import { validateSession } from '../../middlewares/validateSession.js';
import { getUserTodos, createUserTodo, updateUserTodo, deleteUserTodo } from './todos.handlers.js';

const todos = Router();

todos.get('/', validateSession, getUserTodos);
todos.post('/', validateSession ,createUserTodo);
todos.put('/:id', validateSession, updateUserTodo);
todos.delete('/:id', validateSession, deleteUserTodo);




export default todos;
