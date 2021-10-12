const express = require('express');
const router = express.Router();


const userRegister = require('../controller/user/register');
const userLogin = require('../controller/user/login');
const userPost = require('../controller/user/UserPost');
const userComment = require('../controller/user/UserComment');

// Get user posts
router.get('/user/:username', userPost.getUserWithPostsByUserName);

router.route('/user/:username/:postId')
  .get(userPost.getUserPostById)
  .post(userComment.createCommentToPost);


// REGISTER
router.route('/register').post(userRegister.register);
router.route('/login').post(userLogin.login);


//router.route('/users')


router.post('/new-post', userPost.createPost);

router.route('/comment/post/:postId').post(userComment.createCommentToPost);
router.route('/comment/comment/:commentId').post(userComment.createCommentToComment);

module.exports = router;