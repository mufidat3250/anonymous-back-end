const messageRouter = require("express").Router();
const Message = require("../model/message");

messageRouter.get("/", (request, response) => {
  Message.find({}).then((result) => response.status(201).json(result));
});
messageRouter.post("/", (request, response) => {
  const { text } = request.body;

  newmessage = new Message({
    text: text,
  });
  newmessage
    .save()
    .then((message) => {
      response.json(message);
    })
    .catch((error) => console.log(error.message));
});

module.exports = messageRouter;
