import bcrypt from 'bcrypt';
import prisma from '../../db.js';
import { User } from '@prisma/client';
import { User as zodUser } from './users.models.js';



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

export async function userExits(email:string): Promise<User | boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
   return user ? user : false;
} 


export async function destroySession(session: string) {
  let userSession = await prisma.session.delete({
    where: {
      session: session
    }
  })
  if (userSession) {
    return 1;
  }
  return 0;
}


export async function authenticateUser(password: string, user: User) {
  const match = await bcrypt.compare(password, user.password);
  return match;
}

export async function findUserBySession(session: string) {
  const user = await prisma.session.findUnique({
    where: {
      session: session
    },
    select: {
      user: true
    }
  })
  return user;
}