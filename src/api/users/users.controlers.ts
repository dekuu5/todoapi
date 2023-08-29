import bcrypt from 'bcrypt';
import prisma from '../../db.js';
import { User } from '@prisma/client';
import { User as zodUser } from './users.models.js';
import session , { createSession } from '../../utils/sessions.js';
import { Entity } from 'redis-om';



export async function createUser(body: zodUser) {
  const exits = await userExits(body.email);
  if (exits) {
    return null;
  }
  const hashedPassword = await bcrypt.hash(body.password, 9);
  body.password = hashedPassword;
  const newUser = await prisma.user.create({
    data: body
  })
  return newUser;

}

export async function userExits(userEmail:string): Promise<User | boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    }
  })
  console.log(user);
  
   return user ? user : false;
} 


export async function destroySession(s: string) {
  await session.remove(s);
}


export async function authenticateUser(password: string, user: User) {
  const match = await bcrypt.compare(password, user.password);
  return match;
}

export async function findUserBySession(s: string) {
  const sessionData: Entity = await session.fetch(s);
  if (!sessionData) {
    return null;
  }
  let userEmail = sessionData.userEmail?.toString()
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail as string,
    }
  });
  
  return user;
}