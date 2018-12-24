const bcrypt = require('bcryptjs');
const User = require('./models/User');
const authFailed = 'Authentication Failed';

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          reject(authFailed);
        }
      });
    } catch (err) {
      reject(authFailed);
    }
  });
};
