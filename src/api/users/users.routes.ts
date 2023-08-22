import { Router } from "express";
import { userSignUp, userSignIn, userMe, userSignOut }  from './users.handlers.js'
import { validateUserData } from '../../middlewares/validateUserData.js';
import { validateSession } from '../../middlewares/validateSession.js';
const users = Router();


users.post('/sign-up',  validateUserData ,userSignUp);
users.post('/sign-in', validateUserData,userSignIn);
users.post('/sign-out', validateSession, userSignOut);
users.get('/me',validateSession,  userMe);


export default users;

