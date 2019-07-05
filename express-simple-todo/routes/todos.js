const express = require('express');
const router = express.Router();

const todos = [];

function* generateId() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}

const idGenerator = generateId();

class Todo {
  constructor(title, completed = false) {
    this.id = idGenerator.next().value;
    this.title = title;
    this.completed = completed;
  }

  update({ title, completed = null }) {
    this.title = title;
    if (completed !== null) {
      this.completed = !!completed;
    }
  }
}

router.get('/', function(req, res) {
  res.json({ data: todos });
});

router.post('/', function(req, res) {
  let { title } = req.body;

  if (!title || !(title = title.trim())) {
    return res.status(422).json({
      errors: {
        title: ['Title is required'],
      },
    });
  }

  const todo = new Todo(title);

  todos.push(todo);

  return res.status(201).json(todo);
});

router.get('/:id', function(req, res) {
  const { id: todoId } = req.params;
  let todo = null;

  for (let todoTmp of todos) {
    if (todoId == todoTmp.id) {
      todo = todoTmp;
      break;
    }
  }

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found!',
    });
  }

  return res.json(todo);
});

router.put('/:id', function(req, res) {
  const { id: todoId } = req.params;
  let todo = null;

  for (let todoTmp of todos) {
    if (todoId == todoTmp.id) {
      todo = todoTmp;
      break;
    }
  }

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found!',
    });
  }

  let { title, completed } = req.body;

  if (!title || !(title = title.trim())) {
    return res.status(422).json({
      errors: {
        title: ['Title is required'],
      },
    });
  }

  todo.update({
    title,
    completed,
  });

  return res.status(200).json(todo);
});

router.delete('/:id', function(req, res) {
  const { id: todoId } = req.params;
  let todoIndex = null;

  for (let i = 0; i < todos.length; ++i) {
    let todoTmp = todos[i];
    if (todoId == todoTmp.id) {
      todoIndex = i;
      break;
    }
  }

  if (todoIndex === null) {
    return res.status(404).json({
      message: 'Todo not found!',
    });
  }

  const todo = todos[todoIndex];

  todos.splice(todoIndex, 1);

  return res.json(todo);
});

module.exports = router;
