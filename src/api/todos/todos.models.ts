import * as z from 'zod';

export const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean().optional(),

});

export type Todo = z.infer<typeof todoSchema>;

