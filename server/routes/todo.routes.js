const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* ---------- CREATE ---------- */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueAt, priority } = req.body;

    if (!title || !dueAt) {
      return res.status(400).json({ message: "Title and due date required" });
    }

    const todo = await Todo.create({
      title,
      description,
      dueAt,
      priority,
      userId: req.userId,
    });

    res.json(todo);
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

/* ---------- GET ---------- */
router.get("/", auth, async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { userId: req.userId };
    if (category) filter.status = category;

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.json(todos);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

/* ---------- EDIT ---------- */
router.patch("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.status !== "current") {
      return res.status(400).json({ message: "Only active tasks editable" });
    }

    const { title, description, dueAt, priority } = req.body;

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.dueAt = dueAt ?? todo.dueAt;
    todo.priority = priority ?? todo.priority;

    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error("Edit error:", err.message);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

/* ---------- COMPLETE ---------- */
router.patch("/:id/complete", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: "completed" },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Not found" });

    res.json(todo);
  } catch {
    res.status(500).json({ message: "Complete failed" });
  }
});

/* ---------- MISSED ---------- */
router.patch("/:id/incomplete", auth, async (req, res) => {
  try {
    const { reason } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: "incomplete", failureReason: reason || "" },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Not found" });

    res.json(todo);
  } catch {
    res.status(500).json({ message: "Missed update failed" });
  }
});

/* ---------- DELETE ---------- */
router.patch("/:id/delete", auth, async (req, res) => {
  try {
    const { reason } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: "deleted", deleteReason: reason || "" },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Not found" });

    res.json(todo);
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
