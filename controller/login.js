const config = require("../utils/config");
const loginRouter = require("express").Router();
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });

    console.log(user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }
    const userFortoken = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(userFortoken, config.SECRET);

    response.status(200).send({ token, id: user._id });
  } catch (error) {
    logger.error("something went wrong", error.message);
  }
});
module.exports = loginRouter;
