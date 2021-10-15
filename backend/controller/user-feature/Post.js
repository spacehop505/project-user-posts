const UserPostDB = require('../../model/UserPostDB');
const UserDB = require('../../model/UserDB');

const createPost = async (req, res) => {
  const authId = req.user._id;
  const { message } = req.body;
  try {
    const createdNewUserPost = await UserPostDB.create({ author: authId, message: message });
    const updatedUserPostsRef = await UserDB.updateOne({ _id: authId }, { $push: { 'posts': { $each: [createdNewUserPost], $position: 0 } } });
    res.status(200).json({ success: { status: 200, request: 'POST', message: 'POST_CREATED' } });
  } catch (err) {
    res.status(400).json({ message: 'SERVER_ERROR' })
  }
};

const deletePost = async (req, res) => {
  const authId = req.user._id;
  const { postId } = req.params;
  try {
    const postRemoved = await UserPostDB.findOneAndRemove({ '_id': postId, 'author': authId });
    if (!postRemoved) {
      return res.status(400).json({ error: { status: 400, request: 'DELETE', message: 'POST_DOESNT_EXIST' } })
    }
    res.status(200).json({ success: { status: 200, request: 'DELETE', message: 'POST_DELETED' } });
  } catch (err) {
    res.status(400).json({ message: 'SERVER_ERROR' })
  }
}


module.exports = { createPost, deletePost };