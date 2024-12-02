const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userData.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.userData.userId
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userData.userId },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.userData.userId
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;