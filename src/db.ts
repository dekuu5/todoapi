import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const prisma = new PrismaClient();
export const redisClient = createClient({
  url: REDIS_URL
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

await redisClient.connect();


export default prisma