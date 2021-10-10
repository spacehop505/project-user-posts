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
            const accessToken = jwt.sign({ _id: user.id, email: user.email }, 'FAKE_SECRET_ACCESS_TOKEN', { expiresIn: '30m' });
            res.status(200).json({ success: { status: 200, message: 'LOGIN_SUCCESS', accessToken: accessToken } });
          } else {
            res.status(403).json({ error: { status: 403, message: 'INVALID_PASSWORD' } });
          }
        });
      } else {
        res.status(403).json({ error: { status: 403, message: 'INVALID_EMAIL' } });
      }
    }).catch((err) => {
      res.status(400).json({ error: { status: 400, message: 'MONGO_ERROR' } });
    });
};

module.exports = { login };