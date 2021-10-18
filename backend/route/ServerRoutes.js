const express = require('express');
const router = express.Router();

const userRegister = require('../controller/user-main/register');
const userLogin = require('../controller/user-main/login');
const Post = require('../controller/user-feature/Post');
const Comment = require('../controller/user-feature/Comment');
const User = require('../controller/user-feature/User');
const auth = require('../middleware/auth');

// REGISTER
router.route('/register').post(userRegister.register);
router.route('/login').post(userLogin.login);
router.post('/follow-user', auth.middlewareAuth, User.followUser)
router.post('/unfollow-user', auth.middlewareAuth, User.unfollowUser)

// READ USER
router.get('/user/:username', User.findUser);

// READ PROFILE
router.get('/profile/:username', User.findUser);

router.get('/profile/auth/:userId', auth.middlewareAuth, User.findUserLogin);

// READ POST 
router.route('/post/:postId').get(User.findPost)

// POST CREATE
router.route('/post').post(auth.middlewareAuth, Post.createPost);

// POST DELETE
router.route('/post/remove/:postId').delete(auth.middlewareAuth, Post.deletePost);

// COMMENT CREATE 
router.route('/post/comment/:postId').post(auth.middlewareAuth, Comment.createCommentFromPost)

// COMMENT TO POST DELETE
router.route('/post/comment/remove/:commentId').delete(auth.middlewareAuth, Comment.deleteComment)

// COMMENT CREATE
router.route('/comment/comment/:commentId').post(auth.middlewareAuth, Comment.createCommentFromComment);









module.exports = router;