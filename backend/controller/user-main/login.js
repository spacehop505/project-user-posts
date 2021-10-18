const jwt = require('jsonwebtoken');
const UserDB = require('../../model/UserDB');

// * LOGIN 
const login = (req, res) => {
  const { email, password } = req.body;
  UserDB.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        // * compare findOne() password with req.body.password
        user.comparePassword(password, (err, isPasswordMatch) => {
          if (isPasswordMatch) {
            const accessToken = jwt.sign({ _id: user.id, email: user.email }, 'FAKE_SECRET_ACCESS_TOKEN', { expiresIn: '7d' });
            res.status(200).json({ success: { status: 200, message: 'LOGIN_SUCCESS', accessToken: accessToken, userId: user.id } });
          } else {
            res.status(403).json({ error: { status: 403, message: 'INVALID_PASSWORD' } });
          }
        });
      } else {
        res.status(403).json({ error: { status: 403, message: 'INVALID_EMAIL' } });
      }
    }).catch((err) => {
      res.status(401).json({ error: { status: 401, message: 'Could not sign in' } });
    });
};

module.exports = { login };