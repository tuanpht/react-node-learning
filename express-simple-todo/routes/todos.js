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

  const todo = {
    id: idGenerator.next().value,
    title: title,
    completed: false,
  };

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

  if (completed !== undefined) {
    todo.completed = !!completed;
  }
  todo.title = title;

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
