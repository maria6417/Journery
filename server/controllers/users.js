const { getUserInfo, createUser } = require('../models').users;

// GET /user on username
const get = (req, res) => {
  getUserInfo(req.query.username)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log('error getting user info.', err);
      res.sendStatus(500);
    });
};

// store new user
const post = (req, res) => {
  createUser(req.body)
    .then((result) => {
      console.log('successfully created user', result);
      res.json(result);
    })
    .catch((err) => {
      console.log('error creating user.', err);
      res.sendStatus(500);
    });
};

module.exports = {
  get,
  post,
};
