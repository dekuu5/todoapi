import { Router } from 'express';
import { validateSession } from '../../middlewares/validateSession.js';
import { validateTodo } from '../../middlewares/validateTodo.js';
import { getUserBySession } from '../../middlewares/getUserBySession.js';
import { getUserTodos, createUserTodo, updateUserTodo, deleteUserTodo } from './todos.handlers.js';

const todos = Router();

todos.get('/', validateSession, getUserBySession, getUserTodos);
todos.post('/', validateTodo, validateSession, getUserBySession, createUserTodo);
todos.put('/:id', validateSession, updateUserTodo);
todos.delete('/:id', validateSession, deleteUserTodo);




export default todos;
