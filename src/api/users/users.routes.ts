import { Router, Request, Response, NextFunction } from "express";
import { userSignUp }  from './users.handlers.js'


const users = Router();


users.post('/sign-up', userSignUp);


export default users;