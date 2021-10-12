const UserCommentDB = require('../../model/UserCommentDB');
const UserPostDB = require('../../model/UserPostDB');
const jwt = require('jsonwebtoken');


const ConnectionDB = require('../../model/connection/ConnectionDB');


const createCommentToPost = async (req, res) => {
  // ! TRANSACTION
  const session = await ConnectionDB.startSession();
  try {

    const { message } = req.body;
    const { username, postId } = req.params;
    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');


    const transactionResult = await session.withTransaction(async () => {

      const comment = await UserCommentDB({ author: decodeAccessToken._id, message: message }).save({ session })
      console.log('comment', comment);

      const post = await UserPostDB.findByIdAndUpdate(postId, { $push: { comments: { $each: [comment], $position: 0 } } }, { session });
      console.log('post', post);

      if (!post) {
        await session.abortTransaction();
      }
    });

    if (transactionResult) {
      console.log('good', transactionResult)
      res.status(200).json({ success: { status: 200, message: 'ROOT_COMMENT_CREATED' } });
    } else {
      console.log('bad', transactionResult)
      res.status(401).json({ error: { status: 401, message: 'POST_DOESNT_EXIST' } })
    }

  } catch (err) {
    res.status(401).json({ error: { status: 401, message: 'UNOTHORISED_ACCESS_LEVEL', content: err } })
  } finally {
    await session.endSession();
  }
};

const createCommentToComment = async (req, res) => {
  // ! TRANSACTION
  const session = await ConnectionDB.startSession();
  try {
    const { message } = req.body;
    const { commentId } = req.params;
    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');


    const transactionResult = await session.withTransaction(async () => {
      const newCommentReply = await UserCommentDB({ author: decodeAccessToken._id, message: message }).save({ session });

      const insertedCommentInExistingComment = await UserCommentDB.findByIdAndUpdate(commentId, { $push: { comments: { $each: [newCommentReply], $position: 0 } } });
      console.log('ddddddd', insertedCommentInExistingComment)
      // if comment doesnt exist abort 
      if (!insertedCommentInExistingComment) {
        await session.abortTransaction();
      }
    });

    if (transactionResult) {
      console.log('good', transactionResult)
      res.status(200).json({ success: { status: 200, message: 'NESTED_COMMENT_CREATED' } });
    } else {
      console.log('bad', transactionResult)
      res.status(401).json({ error: { status: 401, message: 'POST_DOESNT_EXIST' } })
    }

  } catch (err) {
    res.status(401).json({ error: { status: 401, message: 'UNOTHORISED_ACCESS_LEVEL', content: err } })
  } finally {
    await session.endSession();
  }
};


module.exports = { createCommentToPost, createCommentToComment };