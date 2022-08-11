const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: async (password) => {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  },
  isPasswordCorrect: async (input, hash) => {
    const validPassword = await bcrypt.compare(input, hash);
    return validPassword;
  },
};
