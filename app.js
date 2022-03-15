const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const messageRouter = require("./controller/message");
const userRouter = require("./controller/user");
const loginRouter = require("./controller/login");

try {
  mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info("connected to DB");
  });
} catch (error) {
  logger.error("failed to connect to DB", error.message);
}

const app = express();
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;
