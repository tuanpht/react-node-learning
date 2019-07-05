module.exports = function(app) {
  function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
  }

  function clientErrorHandler(err, req, res, next) {
    if (req.xhr || req.accepts(['html', 'json']) === 'json') {
      const response = { error: 'Something failed!' };
      if (process.env.DEBUG) {
        response.stack = err.stack;
      }
      res.status(500).send(response);
    } else {
      next(err);
    }
  }

  app.use(logErrors);
  app.use(clientErrorHandler);
};
