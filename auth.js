const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const authFailed = 'Authentication Failed';

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });

      bcrypt.compare(user.password, password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) throw authFailed;

        resolve(user);
      });
    } catch (err) {
      reject(authFailed);
    }
  });
};
