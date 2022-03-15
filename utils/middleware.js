const requestLogger = (request, responce, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("body", request.body);

  next();
};

module.exports = {
  requestLogger,
};
