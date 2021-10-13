const UserCommentDB = require('../../model/UserCommentDB');
const UserPostDB = require('../../model/UserPostDB');
const jwt = require('jsonwebtoken');


const ConnectionDB = require('../../model/connection/ConnectionDB');


const createCommentFromPost = async (req, res) => {
  // ! TRANSACTION
  const userId = req.user._id;
  const { message } = req.body;
  const { postId } = req.params;
  const session = await ConnectionDB.startSession();
  try {

    const transactionResult = await session.withTransaction(async () => {
      const comment = await UserCommentDB({ author: userId, message: message }).save({ session })
      const post = await UserPostDB.findByIdAndUpdate(postId, { $push: { comments: { $each: [comment], $position: 0 } } }, { session });
      if (!post) {
        await session.abortTransaction();
      }
    });

    if (transactionResult) {
      res.status(200).json({ success: { status: 200, message: 'COMMENT_TO_POST_CREATED' } });
    } else {
      res.status(401).json({ error: { status: 401, message: 'POST_DOESNT_EXIST' } })
    }

  } catch (err) {
    console.log('createCommentFromPost Error:', err);
    res.status(401).json({ error: { status: 401, message: 'SERVER_ERROR' } });
  } finally {
    await session.endSession();
  }
};


const deleteComment = async (req, res) => {
  // ! TRANSACTION
  const userId = req.user._id;
  const { commentId } = req.params;
  try {
    const comment = await UserCommentDB.findOneAndRemove({ '_id': commentId, 'author': userId })
    if (!comment) {
      return res.status(401).json({ error: { status: 401, message: 'COMMENT_DOESNT_EXIST' } })
    }
    res.status(200).json({ success: { status: 200, message: 'COMMENT_DELETED' } });
  } catch (err) {
    console.log('deleteComment Error:', err);
    res.status(401).json({ error: { status: 401, message: 'SERVER_ERROR' } });
  }
};

const createCommentFromComment = async (req, res) => {
  // ! TRANSACTION
  const userId = req.user._id;
  const { message } = req.body;
  const { commentId } = req.params;
  const session = await ConnectionDB.startSession();
  try {
    const transactionResult = await session.withTransaction(async () => {
      const newCommentReply = await UserCommentDB({ author: userId, message: message }).save({ session });
      const insertedCommentInExistingComment = await UserCommentDB.findByIdAndUpdate(commentId, { $push: { comments: { $each: [newCommentReply], $position: 0 } } });
      if (!insertedCommentInExistingComment) {
        await session.abortTransaction();
      }
    });
    if (transactionResult) {
      res.status(200).json({ success: { status: 200, message: 'NESTED_COMMENT_CREATED' } });
    } else {
      res.status(401).json({ error: { status: 401, message: 'COMMENT_DOESNT_EXIST' } })
    }
  } catch (err) {
    console.log('createCommentFromComment Error:', err);
    res.status(401).json({ error: { status: 401, message: 'SERVER_ERROR' } });
  } finally {
    await session.endSession();
  }
};




module.exports = { createCommentFromPost, deleteComment, createCommentFromComment };