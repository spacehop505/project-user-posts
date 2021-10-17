const UserPostDB = require('../../model/UserPostDB');
const UserDB = require('../../model/UserDB');

const followUser = async (req, res) => {
  const authId = req.user._id;
  const { followUserId } = req.body;
  try {
    if (authId === followUserId) {
      return res.status(400).json({ error: 'You cannot follow yourself' })
    }
    // add user follow to following
    const query1 = { _id: authId, following: { $not: { $elemMatch: { $eq: followUserId } } } }
    const update1 = { $addToSet: { following: followUserId } }
    const updatedFollowing = await UserDB.updateOne(query1, update1)

    // add user follow to following
    const query2 = { _id: followUserId, followers: { $not: { $elemMatch: { $eq: authId } } } }
    const update2 = { $addToSet: { followers: authId } }
    const updatedFollowers = await UserDB.updateOne(query2, update2)

    res.status(200).json({ success: { status: 200, request: 'POST', message: 'FOLLOWED_USER' } })
  } catch (err) {
    res.status(400).json({ error: { status: 400, request: 'POST', message: 'SERVER_ERROR' } });
  }
};

const unfollowUser = async (req, res) => {
  const authId = req.user._id;
  const { followUserId } = req.body;
  try {
    if (authId === followUserId) {
      return res.status(400).json({ error: 'You cannot unfollow yourself' })
    }

    // remove user follow to following
    const query1 = { _id: authId, following: { $elemMatch: { $eq: followUserId } } }
    const update1 = { $pull: { following: followUserId } }
    const updatedFollowing = await UserDB.updateOne(query1, update1)

    // remove user follow to following
    const query2 = { _id: followUserId, followers: { $elemMatch: { $eq: authId } } }
    const update2 = { $pull: { followers: authId } }
    const updatedFollowers = await UserDB.updateOne(query2, update2)

    res.status(200).json({ success: { status: 200, request: 'POST', message: 'UN-FOLLOWED_USER' } })
  } catch (err) {
    res.status(400).json({ error: { status: 400, request: 'POST', message: 'SERVER_ERROR' } });
  }
};

const findUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserDB.findOne({ username: username }).select('-email -updatedAt').populate('posts', '-author -updatedAt')
    if (!user) {
      return res.status(400).json({ success: { status: 400, message: 'USER_NOT_FOUND' } })
    }
    res.status(200).json({ success: { status: 200, message: 'POSTS_BY_USERNAME_DOCUMENTS_SENT', content: user } })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: { status: 400, message: 'SERVER_ERROR' } });
  }
};

const findPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const postResult = await UserPostDB.findOne({ _id: postId }).select('-updatedAt').populate('comments').populate('author')
    if (!postResult) {
      return res.status(400).json({ success: { status: 400, message: 'POST_NOT_FOUND' } })
    }
    res.status(200).json({ success: { status: 200, request: 'GET', message: 'POST_BY_ID_DOCUMENTS_SENT', content: postResult } })
  } catch (err) {
    res.status(400).json({ error: { status: 400, request: 'GET', message: 'SERVER_ERROR' } });
  }
};


module.exports = { findUser, findPost, followUser, unfollowUser };