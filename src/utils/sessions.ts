import {v4 as uuidv4, } from "uuid";
import prisma from "../db.js";
import { User } from "@prisma/client";


export async function createSession(user:User) {
  const session: string =  uuidv4();
  const userSession = await prisma.session.create({
    data: {
      session: session,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      user: { connect: { id: user.id } }
    }

  })
  return session;
}
