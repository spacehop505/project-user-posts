const express = require('express');
const router = express.Router();


const userRegister = require('../controller/user/register');
const userLogin = require('../controller/user/login');
const userPost = require('../controller/user/UserPost');
const userComment = require('../controller/user/UserComment');
const readUser = require('../controller/user/readUser');
const auth = require('../controller/auth');

// REGISTER
router.route('/register').post(userRegister.register);
router.route('/login').post(userLogin.login);

// READ USER
router.get('/user/:username', readUser.readUserByUsername);

// READ POST 
router.route('/user/:username/:postId').get(readUser.readPostByUsernamePostId)

// POST CREATE
router.route('/post').post(auth.middlewareAuth, userPost.createPost);

// POST DELETE
router.route('/post/remove/:postId').delete(auth.middlewareAuth, userPost.deletePost);

// COMMENT CREATE 
router.route('/post/comment/:postId').post(auth.middlewareAuth, userComment.createCommentFromPost)

// COMMENT TO POST DELETE
router.route('/post/comment/remove/:commentId').delete(auth.middlewareAuth, userComment.deleteComment)

// COMMENT CREATE
router.route('/comment/comment/:commentId').post(auth.middlewareAuth, userComment.createCommentFromComment);










module.exports = router;