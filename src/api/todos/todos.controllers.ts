import { User } from "@prisma/client";
import prisma, {redisClient} from "../../db.js";
import { Todo } from "./todos.models.js";

export async function findTodosByUserId(user: User) {
  const todos = await prisma.todo.findMany({
    where: {
      user: user
    }
  });
  
  
  return todos;
}


export async function CreateTodoWithUserId(userId: number, body: Todo) {
  const todo = await prisma.todo.create({
    data: {
      description: body.description,
      userID: userId,
      title: body.title
    }
  });

  return todo;
}