import { Router } from "express";
import { userSignUp, userSignIn, userMe, userSignOut }  from './users.handlers.js'


const users = Router();


users.post('/sign-up', userSignUp);
users.post('/sign-in', userSignIn);
users.post('/sign-out', userSignOut);
users.get('/me', userMe);


export default users;