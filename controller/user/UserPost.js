const UserPostDB = require('../../model/UserPostDB');
const UserDB = require('../../model/UserDB');
const ConnectionDB = require('../../model/connection/ConnectionDB');


const createPost = async (req, res) => {
  const userId = req.user._id;
  const { message } = req.body;
  try {
    const createdNewUserPost = await UserPostDB.create({ author: userId, message: message });
    const updatedUserPostsRef = await UserDB.updateOne({ _id: userId }, { $push: { 'posts': { $each: [createdNewUserPost], $position: 0 } } });
    res.status(200).json({ success: { status: 200, message: 'POST_CREATED' } });
  } catch (err) {
    console.log('createPost Error:', err);
    res.status(401).json({ error: { status: 401, message: 'SERVER_ERROR' } })
  }
};

const deletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  try {
    const postRemoved = await UserPostDB.findOneAndRemove({ '_id': postId, 'author': userId });
    if (!postRemoved) {
      return res.status(401).json({ error: { status: 401, message: 'POST_DOESNT_EXIST' } })
    }
    res.status(200).json({ success: { status: 200, message: 'POST_DELETED' } });
  } catch (err) {
    console.log('deletePost Error:', err);
    res.status(401).json({ error: { status: 401, message: 'SERVER_ERROR' } })
  }
}


module.exports = { createPost, deletePost };