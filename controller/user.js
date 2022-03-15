const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const User = require("../model/users");

userRouter.get("/", async (request, response) => {
  const user = await User.find({});
  console.log(User);
  response.status(201).json(user);
});

userRouter.post("/", async (request, response) => {
  const { email, name, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(401).json({ error: "user already exist" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    password: passwordHash,
  });

  const savedUser = await user.save(user);
  response.status(201).json(savedUser);
});
module.exports = userRouter;
