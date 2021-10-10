const UserDB = require('../../model/UserDB');

const register = (req, res) => {
  const { email, password, username } = req.body;
  const user = new UserDB({ email: email, password: password, username: username });

  user.save()
    .then(() => {
      res.status(200).json({ success: { status: 200, message: 'REGISTER_SUCCESS', user: { id: user.id, email: user.email } } });
    })
    .catch(err => {
      console.log(err);
      if (err.constructor.name === 'ValidationError') {
        errorMessage = 'VALIDATION_ERROR';
      } else if (err.constructor.name === 'MongoServerError') {
        if (err.keyPattern.email) {
          errorMessage = 'EMAIL_EXISTS';
        } else if (err.keyPattern.username) {
          errorMessage = 'USERNAME_EXISTS';
        } else {
          errorMessage = err;
        }
      } else {
        errorMessage = err;
      }
      res.status(400).json({ error: { status: 400, message: errorMessage } });
    })
}



module.exports = { register };