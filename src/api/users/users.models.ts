import * as z from "zod";

export const user = z.object(
  {
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    
  }
)

export type User = z.infer<typeof user>;



