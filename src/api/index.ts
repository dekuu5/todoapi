import { Router, Request, Response, NextFunction } from "express";

import users from './users/users.routes.js'
import todos from "./todos/todos.routes.js";

const router = Router();

router.get('/', (req, res) => {
  res.json({
    massage:"hello from /api"
  })
});

router.use('/users', users);
router.use('/todos', todos);



export default router;

