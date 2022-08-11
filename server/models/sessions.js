const { Sessions, Users } = require('../db');
// get userId from sessionId
const getUserInfo = async (sessionId) => {
  try {
    const session = await Sessions.findOne({
      where: { id: sessionId },
    });
    return Users.findOne({
      where: { id: session.user_id },
    });
  } catch (e) {
    console.log(e);
  }
};

// 2. store new session with given sessionId and userId
const create = (sessionId, userId) => Sessions.create({
  id: sessionId,
  user_id: userId,
});

module.exports = {
  getUserInfo,
  create,
};
