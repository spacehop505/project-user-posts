const UserPostDB = require('../../model/UserPostDB');
const UserDB = require('../../model/UserDB');
const jwt = require('jsonwebtoken');

const createPost = async (req, res) => {
  try {
    const { message } = req.body;
    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');
    //const user = await UserDB.findById(decodeAccessToken._id);
    const post = new UserPostDB({ author: decodeAccessToken._id, message: message });
    const postSave = await post.save();
    const aaa = await UserDB.findByIdAndUpdate(decodeAccessToken._id, { $push: { posts: { $each: [postSave], $position: 0 } } });
    console.log('aaa', aaa)
    res.status(200).json({ success: { status: 200, message: 'POST_CREATED' } });
  } catch (err) {
    res.status(401).json({ error: { status: 401, message: 'UNOTHORISED_ACCESS_LEVEL', content: err.message } })
  }
};

const getUserWithPostsByUserName = (req, res) => {
  const { username } = req.params;
  UserDB.find({ username: username }).lean().populate('posts', '-author -updatedAt')
    .then((result) => res.status(200).json({ success: { status: 200, message: 'POSTS_BY_USERNAME_DOCUMENTS_SENT', content: result } }))
    .catch((err) => res.status(401).json({ error: { status: 401, message: 'MONGODB_ERROR', content: err } }))
};
Y
const getUserPostById = (req, res) => {
  const { username, postId } = req.params;
  UserPostDB.findOne({ '_id': postId, username: username })
    .then((postResult) => {
      if (!postResult) {
        throw new Error('POST_NOT_FOUND')
      }
      res.status(200).json({ success: { status: 200, request: 'GET', message: 'POST_BY_ID_DOCUMENTS_SENT', content: postResult } })
    })
    .catch((err) => { res.status(400).json({ error: { status: 400, request: 'GET', message: 'MONGO_ERROR', content: err.message } }); });
};



module.exports = { createPost, getUserWithPostsByUserName, getUserPostById };