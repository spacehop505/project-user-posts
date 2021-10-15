const jwt = require('jsonwebtoken');

const middlewareAuth = (req, res, next) => {
  const accessToken = req.header('Authorization');
  const token = accessToken && accessToken.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'MISSING_TOKEN' });
  }
  jwt.verify(token, 'FAKE_SECRET_ACCESS_TOKEN', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'AUTHENTICATION_FAILED' });
    }
    req.user = user;
    console.log('Authentication Successfull')
    next();
  });
};

module.exports = { middlewareAuth }