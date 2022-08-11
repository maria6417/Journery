const { sequelize, Sessions, Users } = require('../db');
// get userId from sessionId
const getUserInfo = async (sessionId) => (
  sequelize.query('select u.id, u.username, u.email from users u inner join sessions s on u.id = s.user_id where s.id = ?',
    {
      replacements: [sessionId],
    },
  ).then((result) => result[0])
);

// 2. store new session with given sessionId and userId
const create = (sessionId, userId) => Sessions.create({
  id: sessionId,
  user_id: userId,
});

module.exports = {
  getUserInfo,
  create,
};
