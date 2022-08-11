const { getUserInfo, create } = require('../models').sessions;

const getSession = (req, res) => {
  getUserInfo(req.query.session_id)
    .then((result) => res.json({
      id: result.dataValues.id,
      username: result.dataValues.username,
      email: result.dataValues.email,
    }))
    .catch((err) => {
      console.log('error getting session', err);
      res.sendStatus(500);
    });
};

const createSession = (req, res) => {
  create(req.body.session_id, req.body.user_id)
    .then((result) => res.json(result))
    .catch((err) => {
      console.log('error creating session', err);
      res.sendStatus(500);
    })
};

module.exports = {
  getSession,
  createSession,
};
