import app from './app.js';
import dotenv from 'dotenv';
import prisma from './db.js';

dotenv.config()
await prisma.$connect()

const PORT: Number = Number(process.env.PORT ?? 3000);

app.listen(PORT, () => {

  console.log(`api is running on port ${PORT}\n here is the link http://localhost:${PORT}/`);
});