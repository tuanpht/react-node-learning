const express = require('express');
const router = express.Router();

const todos = [];

router.get('/', function(req, res) {
  res.json({ data: todos });
});

module.exports = router;
