import { Router, Request, Response, NextFunction } from "express";

import users from './users/users.routes.js'

const router = Router();

router.get('/', (req, res) => {
  res.json({
    massage:"hello from /api"
  })
});

router.use('/users', users);



export default router;

