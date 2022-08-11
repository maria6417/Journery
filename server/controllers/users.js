const { getUserInfo, createUser } = require('../models').users;
const { hashPassword, isPasswordCorrect } = require('../lib/hash');

// GET /user on username
const login = (req, res) => {
  getUserInfo(req.body.username)
    .then((result) => {
      if (!result) res.status(404).end('username does not exist');
      if (result) {
        isPasswordCorrect(req.body.password, result.dataValues.password)
          .then((result2) => {
            if (result2) {
              res.json({
                id: result.dataValues.id,
                username: result.dataValues.username,
                email: result.dataValues.email,
              });
            }
            if (!result2) res.status(404).end('password is incorrect');
          });
      }
    })
    .catch((err) => {
      console.log('error getting user info.', err);
      res.sendStatus(500);
    });
};

// store new user
const signup = (req, res) => {
  console.log('here', req.body);
  // check if username exists
  getUserInfo(req.body.username)
    .then((result) => {
      if (result) res.status(404).end('username exists');
      if (!result) {
        hashPassword(req.body.password)
          .then((hashedPassword) => {
            createUser({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
            })
              .then((result2) => {
                res.json({
                  id: result2.dataValues.id,
                  username: result2.dataValues.username,
                  email: result2.dataValues.email,
                });
              });
          });
      }
    })
    .catch((err) => {
      console.log('error creating new user', err);
      res.sendStatus(500);
    });
};

module.exports = {
  login,
  signup,
};
