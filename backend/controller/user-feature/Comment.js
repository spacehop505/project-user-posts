const UserCommentDB = require('../../model/UserCommentDB');
const UserPostDB = require('../../model/UserPostDB');

const createCommentFromPost = async (req, res) => {
  const authId = req.user._id;
  const { message } = req.body;
  const { postId } = req.params;
  try {
    const post = await UserPostDB.findById(postId);
    if (!post) {
      return res.status(400).json({ error: { status: 400, message: 'POST_DOES_NOT_EXIST' } })
    }
    const comment = await UserCommentDB({ author: authId, message: message }).save();
    const post = await UserPostDB.findByIdAndUpdate(postId, { $push: { comments: { $each: [comment], $position: 0 } } });
    res.status(200).json({ success: { status: 200, message: 'COMMENT_TO_POST_CREATED' } });
  } catch (err) {
    res.status(400).json({ error: { status: 400, message: 'SERVER_ERROR' } });
  }
};

const createCommentFromComment = async (req, res) => {
  const authId = req.user._id;
  const { message } = req.body;
  const { commentId } = req.params;
  try {
    const comment = await UserCommentDB.findById(postId);
    if (!comment) {
      return res.status(400).json({ error: { status: 400, request: 'POST', message: 'COMMENT_DOES_NOT_EXIST' } })
    }
    const newCommentReply = await UserCommentDB({ author: authId, message: message }).save();
    const insertedCommentInExistingComment = await UserCommentDB.findByIdAndUpdate(commentId, { $push: { comments: { $each: [newCommentReply], $position: 0 } } });
    res.status(200).json({ success: { status: 200, request: 'POST', message: 'NESTED_COMMENT_CREATED' } });
  } catch (err) {
    res.status(400).json({ error: { status: 400, request: 'POST', message: 'SERVER_ERROR' } });
  }
};

const deleteComment = async (req, res) => {
  const authId = req.user._id;
  const { commentId } = req.params;
  try {
    const comment = await UserCommentDB.findOneAndRemove({ '_id': commentId, 'author': authId })
    if (!comment) {
      return res.status(401).json({ error: { status: 401, message: 'COMMENT_DOESNT_EXIST' } })
    }
    res.status(200).json({ success: { status: 200, message: 'COMMENT_DELETED' } });
  } catch (err) {
    res.status(400).json({ error: { status: 400, message: 'SERVER_ERROR' } });
  }
};





module.exports = { createCommentFromPost, deleteComment, createCommentFromComment };