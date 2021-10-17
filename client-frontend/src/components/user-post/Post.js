import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import axios from 'axios';

const Post = ({ getPost, AxiosGetPosts }) => {
  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });
  const [activeComment, setActiveComment] = useState(null);
  const [getMessage, setMessage] = useState('');
  const isReplying = activeComment && activeComment.value == true && activeComment.id == getPost._id;

  const createUserComment = async (commentid, message) => {
    await api.post(`/post/comment/${commentid}`, { message: message }, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZjdiMTRiMDQwNjQzMmU0ZDE0NzAiLCJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJpYXQiOjE2MzQzNzMwMDgsImV4cCI6MTYzNDk3NzgwOH0.wxOXmAJBM9orovCyryBtBp5BX1F5dducLZY2nmM4G14` } })
      .then(res => {
        console.log('[createUserPost] -', res);
        setActiveComment(null);
        AxiosGetPosts(getPost._id)
      }).catch(err => {
        console.log(err)
      })
  }


  const deleteUserComment = async (commentid) => {
    await api.delete(`/post/remove/${commentid}`, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZjdiMTRiMDQwNjQzMmU0ZDE0NzAiLCJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJpYXQiOjE2MzQzNzMwMDgsImV4cCI6MTYzNDk3NzgwOH0.wxOXmAJBM9orovCyryBtBp5BX1F5dducLZY2nmM4G14` } })
      .then(res => {
        console.log('deleted');
      }).catch(err => {
        console.log(err, 'fail');
      })
  }



  return (
    <div>
      <div className="columns m-0">
        <div className="column is-1">
          <div className="columns pt-1 pb-0">
            <figure className="image is-48x48">
              <img className="is-rounded" alt="" src="https://bulma.io/images/placeholders/48x48.png" />
            </figure>
          </div>
        </div>

        <div className="column p-0 pl-2 ">
          <p className="has-text-weight-bold">{getPost.author.username}</p>
          <p className="is-italic is-size-7">{new Date(getPost.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="column p-1 ">
          {(getPost.author._id == '6167f7b14b0406432e4d1470') && (
            <div className=" p-0">
              <button className="button is-danger ml-1 is-small is-pulled-right" onClick={() => deleteUserComment(getPost._id)}>delete</button>
            </div>
          )}
          <div className=" p-0">
            <button className="button is-small is-info is-pulled-right"
              onClick={() => { setActiveComment({ id: getPost._id, value: true }) }}>reply</button>
          </div>
        </div>
      </div>

      <div className="pl-6 ">
        <span className="ow has-text-weight-bold">{getPost.message}</span>
      </div>

      {isReplying && (<CommentForm
        formID={getPost._id}
        setActiveComment={setActiveComment}
        createUserComment={createUserComment}
        getMessage={getMessage}
        setMessage={setMessage} />)}

    </div>
  );
}


export default Post;