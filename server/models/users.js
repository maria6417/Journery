const { Users } = require('../db');
// 1. get user info by username
const getUserInfo = (username) => Users.findOne({
  where: { username },
});

// 2. store new user with given username and password
const createUser = (userInfo) => Users.create(userInfo);

module.exports = {
  getUserInfo,
  createUser,
};
