
const jwt = require('jsonwebtoken');

/*
const middlewareAuth = (req, res, next) => {
  try {
    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');
    const userId = decodeAccessToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
*/

const middlewareAuth = (req, res, next) => {
  const accessToken = req.header('Authorization');
  const token = accessToken && accessToken.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'MISSING_TOKEN' });
  }
  jwt.verify(token, 'FAKE_SECRET_ACCESS_TOKEN', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'AUTHENTICATION_FAILED' });
    }
    req.user = user;
    console.log('Authentication Successfull')
    next();
  });
};

module.exports = { middlewareAuth }