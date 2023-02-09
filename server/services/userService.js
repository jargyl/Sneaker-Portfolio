const User = require("../models/userModel.js");

module.exports.findUserByCredentials = async function (username, password) {
  console.log("username: ", username);
  const user = await User.findOneByCredentials(username, password);
  return user;
};
