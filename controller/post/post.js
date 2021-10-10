const PostDB = require('../../model/PostDB');
const UserDB = require('../../model/UserDB');
const jwt = require('jsonwebtoken');

const createPost = async (req, res) => {
  try {
    const { message } = req.body;

    const accessToken = req.header('Authorization').split(' ')[1];
    const decodeAccessToken = jwt.verify(accessToken, 'FAKE_SECRET_ACCESS_TOKEN');

    //const user = await UserDB.findById(decodeAccessToken._id);
    const post = new PostDB({ author: decodeAccessToken._id, message: message });
    const postSave = await post.save();
    await UserDB.findByIdAndUpdate(decodeAccessToken._id, { $push: { posts: { $each: [post._id], $position: 0 } } });
    res.status(200).json({ success: { status: 200, message: 'POST_CREATED' } });
  } catch (err) {
    res.status(401).json({ error: { status: 401, message: 'UNOTHORISED_ACCESS_LEVEL', content: err } })
  }
};

const getPosts = async (req, res) => {
  try {
    const result = await PostDB.find({}).lean().populate('comments');

    res.status(200).json({ success: { status: 200, message: 'MONGO_POST_DOCUMENTS_SENT', content: result } });

  } catch (err) {
    res.status(401).json({ error: { status: 401, message: 'err', content: err } })
  }
};


const getPostById = (req, res) => {
  Post.findById(req.params.id).populate('comments').lean()
    //.populate('author')
    .then((result) => res.status(200).json({ success: { status: 200, request: 'GET', message: 'MONGO_POST_BY_ID_DOCUMENTS_SENT', content: result } }))
    .catch((err) => { res.status(400).json({ error: { status: 400, request: 'GET', message: 'MONGO_ERROR', content: err.message } }); });
};



module.exports = { createPost, getPosts };