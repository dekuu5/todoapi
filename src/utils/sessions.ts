import { v4 as uuidv4 } from "uuid";
import prisma, { redisClient as redis} from "../db.js";
import { Entity, Repository, Schema,  } from 'redis-om';
import { User } from "@prisma/client";


let sessionTTL = 60 * 60 * 24 * 1; // 1 days
let SessionSchema = new Schema('Session', {
  expiresAt: { type: "date" },
  userEmail: { type: "string"},
  userId: { type: "number"}
}
);

let session = new Repository(SessionSchema, redis);




export async function createSession(user:User) {
  const s: string =  uuidv4();
  const ss = await session.save(s, {
    expiresAt: new Date(Date.now() + sessionTTL * 1000),
    userEmail: user.email,
    userId: user.id
  });
  session.expire(s, sessionTTL);

  return s;
}


export default session;