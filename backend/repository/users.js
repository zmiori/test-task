const User = require("../model/user");

const findUserByAccessToken = async (accessToken) => {
  return await User.findOne({ accessToken });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, accessToken) => {
  return await User.updateOne({ _id: id }, { accessToken });
};

const updateFeed = async (id, feed) => {
  return await User.updateOne({ _id: id }, { feed });
};

module.exports = {
  findUserByAccessToken,
  createUser,
  findUserByEmail,
  updateToken,
  updateFeed,
};
