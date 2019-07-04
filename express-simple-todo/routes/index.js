var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

// Test error
router.get('/error', function(req, res, next) {
  throw new Error('Error occurred');
});

function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Async error'));
    }, 500);
  });
}

// Test async error
router.get('/async-error', async function(req, res, next) {
  try {
    await asyncFunction();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
