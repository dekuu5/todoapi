import bcrypt from 'bcrypt';
import prisma from '../../db.js';
import { User } from './users.models.js';


export async function createUser(body:User) {
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

async function userExits(email:string): Promise<Boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
   return user ? true : false;
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