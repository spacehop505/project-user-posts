const CommentDB = require('../../model/CommentDB');
const PostDB = require('../../model/PostDB');
const jwt = require('jsonwebtoken');
const createRootComment = async (req, res) => {
  try {
    const { message } = req.body;
    const { postId } = req.params;
    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');

    const comment = new CommentDB({ author: decodeAccessToken._id, message: message });
    const commentSave = await comment.save();
    await PostDB.findByIdAndUpdate(postId, { $push: { comments: { $each: [comment._id], $position: 0 } } });
    res.status(200).json({ success: { status: 200, message: 'ROOT_COMMENT_CREATED' } });
  } catch (err) {

    res.status(401).json({ error: { status: 401, message: 'UNOTHORISED_ACCESS_LEVEL', content: err } })
  }
};

const createNestedComment = async (req, res) => {
  try {

    const { message } = req.body;
    const { commentId } = req.params;
    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');

    const comment = new CommentDB({ author: decodeAccessToken._id, message: message });
    const commentSave = await comment.save();
    await CommentDB.findByIdAndUpdate(commentId, { $push: { replies: { $each: [comment._id], $position: 0 } } });
    res.status(200).json({ success: { status: 200, message: 'NESTED_COMMENT_CREATED' } });
  } catch (err) {
    res.status(401).json({ error: { status: 401, message: 'UNOTHORISED_ACCESS_LEVEL', content: err } })
  }
};


module.exports = { createRootComment, createNestedComment };