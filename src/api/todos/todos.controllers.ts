import { User } from "@prisma/client";
import prisma from "../../db.js";
import { Todo } from "./todos.models.js";

export async function findTodosByUserId(user: User) {
  const todos = await prisma.todo.findMany({
    where: {
      user: user,
    },
  });

  return todos;
}

export async function CreateTodoWithUserId(userId: number, body: Todo) {
  const todo = await prisma.todo.create({
    data: {
      description: body.description,
      userID: userId,
      title: body.title,
    },
  });

  return todo;
}

export async function deleteTodoById(id: number, userId: number) {
  try {
    await prisma.todo.delete({
      where: {
        id: id,
        userID: userId,
      },
    });
    return 1;
  } catch (error) {
    console.log(error);

    return 0;
  }
}

export async function markTodoWithComplete(id: number, userId: number) {
  try {
    await prisma.todo.update({
      where: {
        id: id,
        userID: userId,
      },
      data: {
        completed: true,
      },
    });
  return 1;
} catch (error) {
  console.log(error);

  return 0; 
}
  
}
