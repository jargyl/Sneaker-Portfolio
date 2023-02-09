const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

module.exports.login = async function (req, res, next) {
  try {
    const status = 200;
    const username = req.body.username;
    const password = req.body.password;
    let user = await userService.findUserByCredentials(username, password);
    console.log("user: ", user);
    const token = jwt.sign({ _id: user._id, roles: user.roles }, SECRET, {
      expiresIn: JWT_EXPIRATION,
      algorithm: "HS256",
    });
    user = {
      _id: user._id,
      username: user.username,
      roles: user.roles,
    };
    res.status(status).json({ user, token });
  } catch (err) {
    next(err);
  }
};
