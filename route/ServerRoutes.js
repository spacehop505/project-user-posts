const express = require('express');
const router = express.Router();


const userRegister = require('../controller/user/register');
const userLogin = require('../controller/user/login');
const userPost = require('../controller/post/post');
const userComment = require('../controller/comment/comment');

// REGISTER
router.post('/register', userRegister.register);
router.post('/login', userLogin.login);

// POST
router.post('/create-post', userPost.createPost);
router.get('/post', userPost.getPosts);

// COMMENT
router.post('/create-comment/:postId', userComment.createRootComment);
router.post('/create-comment-to-comment/:commentId', userComment.createNestedComment);

module.exports = router;