const UserPostDB = require('../../model/UserPostDB');
const UserDB = require('../../model/UserDB');


const readUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserDB.findOne({ username: username }).select('-email -updatedAt').populate('posts', '-author -updatedAt')
    if (!user) {
      return res.status(400).json({ success: { status: 400, message: 'USER_NOT_FOUND' } })
    }
    res.status(200).json({ success: { status: 200, message: 'POSTS_BY_USERNAME_DOCUMENTS_SENT', content: user } })
  } catch (err) {
    console.log('readUserByUsername Error:', err);
    res.status(401).json({ error: { status: 401, message: 'SERVER_ERROR' } });
  };
};

const readPostByUsernamePostId = (req, res) => {
  const { username, postId } = req.params;
  UserPostDB.findOne({ _id: postId, username: username }).select('-updatedAt').populate('comments')
    .then((postResult) => {
      if (!postResult) {
        throw new Error('POST_NOT_FOUND')
      }
      res.status(200).json({ success: { status: 200, request: 'GET', message: 'POST_BY_ID_DOCUMENTS_SENT', content: postResult } })
    })
    .catch((err) => { res.status(400).json({ error: { status: 400, request: 'GET', message: 'MONGO_ERROR', content: err.message } }); });
};
module.exports = { readUserByUsername, readPostByUsernamePostId };