const UserDB = require('../../model/UserDB');

const register = (req, res) => {
  const { email, password, username } = req.body;
  const user = new UserDB({ email: email, password: password, username: username });

  user.save()
    .then(() => {
      res.status(200).json({ success: { status: 200, message: 'REGISTER_SUCCESS', user: { id: user.id, email: user.email } } });
    })
    .catch(err => {
      res.status(400).json({ error: { status: 400, message: err } });
    })
};

module.exports = { register };