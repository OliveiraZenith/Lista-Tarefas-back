import { prisma } from "../prisma/client.js";

export function createTask(userId, { title, description, completed }) {
  return prisma.task.create({
    data: {
      title,
      description: description ?? null,
      completed: completed ?? false,
      userId,
    },
  });
}

export function listTasks(userId) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateTask(userId, taskId, data) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
  if (!task) {
    const err = new Error("Tarefa não encontrada");
    err.statusCode = 404;
    throw err;
  }

  const { title, description, completed } = data;
  return prisma.task.update({
    where: { id: taskId },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(completed !== undefined && { completed }),
    },
  });
}

export async function deleteTask(userId, taskId) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
  if (!task) {
    const err = new Error("Tarefa não encontrada");
    err.statusCode = 404;
    throw err;
  }

  await prisma.task.delete({ where: { id: taskId } });
}
