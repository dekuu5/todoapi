import bcrypt from 'bcrypt';
import prisma from '../../db.js';
import { User } from './users.models.js';


export async function createUser(body:User) {

  const hashedPassword = await bcrypt.hash(body.password, 9);
  const newUser = await prisma.user.create({
    data: body
  })
  console.log(newUser);
  return newUser;

}
