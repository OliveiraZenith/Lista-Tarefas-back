import * as taskService from "../services/task.service.js";

export async function create(req, res, next) {
  try {
    const { title, description, completed } = req.body;
    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Informe title (string)" });
    }

    const task = await taskService.createTask(req.userId, {
      title,
      description,
      completed,
    });
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const tasks = await taskService.listTasks(req.userId);
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const { title, description, completed } = req.body;
    const task = await taskService.updateTask(req.userId, id, {
      title,
      description,
      completed,
    });
    return res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    await taskService.deleteTask(req.userId, id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
