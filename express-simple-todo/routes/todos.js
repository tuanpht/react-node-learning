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

  delete() {
    this.deleted_at = new Date();
  }
}

class TodoNotFound extends Error {
  constructor(message) {
    super(message);

    this.name = 'TodoNotFound';
    this.status = 404;
  }
}

class TodoQuery {
  findAll() {
    return todos.filter((todo) => !todo.deleted_at);
  }

  findById(id) {
    let todo = null;

    for (let todoTmp of todos) {
      if (id == todoTmp.id) {
        todo = todoTmp;
        break;
      }
    }

    if (!todo || todo.deleted_at) {
      throw new TodoNotFound('Todo not found!');
    }

    return todo;
  }
}

function validateTodoBody(req, res, next) {
  let { title } = req.body;

  if (!title || !(title = title.trim())) {
    return res.status(422).json({
      errors: {
        title: ['Title is required'],
      },
    });
  }

  return next();
}

router.get('/', function(req, res) {
  res.json({ data: new TodoQuery().findAll() });
});

router.post('/', validateTodoBody, function(req, res) {
  const todo = new Todo(req.body.title);

  todos.push(todo);

  return res.status(201).json(todo);
});

router.get('/:id', function(req, res) {
  const todo = new TodoQuery().findById(req.params.id);

  return res.json(todo);
});

router.put('/:id', validateTodoBody, function(req, res) {
  const todo = new TodoQuery().findById(req.params.id);

  let { title, completed } = req.body;

  todo.update({
    title,
    completed,
  });

  return res.status(200).json(todo);
});

router.delete('/:id', function(req, res) {
  const todo = new TodoQuery().findById(req.params.id);

  todo.delete();

  return res.json(todo);
});

// Error handler
router.use(function(err, req, res, next) {
  if (err instanceof TodoNotFound) {
    return res.status(err.status).json({ message: err.message });
  }

  next(err);
});

module.exports = router;
