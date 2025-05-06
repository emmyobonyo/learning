import express from "express";
import db from "../db.js";
import prisma from "../prismaClient.js";

const router = express.Router();

// Get all todos for logged-in user
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
  res.json(todos);
});

// Create a new todo
router.post("/", async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      userId: req.userId,
    },
  });
  res.json(todo);
});

// Update a todo
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updatedTodo = prisma.todo.update({
    where: { id: parseInt(id), userId: req.userId },
    data: { completed: !!completed },
  });
  res.json(updatedTodo);
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const deleteTodo = await prisma.todo.delete({
    where: { id: parseInt(id), userId },
  });
  res.json(deleteTodo);
});

export default router;
