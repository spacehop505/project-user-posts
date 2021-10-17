import React from "react";
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
const Post = ({ postInfo, userInfo, userTest }) => {
  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });

  const deleteUserPost = async () => {
    console.log(postInfo._id);
    await api.delete(`/post/remove/${postInfo._id}`, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZjdiMTRiMDQwNjQzMmU0ZDE0NzAiLCJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJpYXQiOjE2MzQzNzMwMDgsImV4cCI6MTYzNDk3NzgwOH0.wxOXmAJBM9orovCyryBtBp5BX1F5dducLZY2nmM4G14` } })
      .then(res => {
        userTest();
      }).catch(err => {
        console.log('fail')
      })
  }

  return (
    <div className="main-top border-body mt-4 has-background-white p-4">
      <div className="">
        <div className="columns m-0 ">
          <div className="column  is-2  ">
            <div className="columns is-flex   ">
              <figure className="image is-48x48">
                <img className="is-rounded" alt="" src="https://bulma.io/images/placeholders/48x48.png" />
              </figure>
            </div>
          </div>
          <div className="column pl-0 p-0">
            <p className="has-text-weight-bold">{userInfo.username}</p>
            <p className="is-italic is-size-7">{postInfo.createdAt}</p>
          </div>
          <div className="column pl-0 p-0">
            <button className="button has-text-weight-bold" onClick={deleteUserPost}>Delete</button>
          </div>
        </div>
        <div className="mt-2 content">
          <span className="ow">{postInfo.message}</span>
        </div>

        <div className="comment mt-2 pt-2 ">
          <Link to={`/post/${postInfo._id}`} >Comments {postInfo.comments.length}</Link>
        </div>
      </div>
    </div>
  );
}

export default Post;