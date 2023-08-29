import { Request, Response } from 'express';



export async function getUserTodos(req: Request, res: Response) {
  res.json([{
    id: 1,
    title: "Todo 1",
    description: "Description 1",
    completed: false,
    user_id: 1
  },
  {
    id: 2,
    title: "Todo 2",
    description: "Description 2",
    completed: false,
    user_id: 1
  },
  
  
])
}

export async function createUserTodo(req: Request, res: Response) {
}

export async function updateUserTodo(req: Request, res: Response) {
}
export async function deleteUserTodo(req: Request, res: Response) {

}