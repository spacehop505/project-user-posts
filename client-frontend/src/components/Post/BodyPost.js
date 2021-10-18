import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import Comment from "./Comment";
import axios from 'axios';
import Post from "./Post";
const PostBody = ({ }) => {

  const param = useParams().postId;


  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });

  console.log('useParams() :',);
  const [getPost, setPost] = useState({ comments: [], author: { _id: '' } });


  const BackendGetPost = async (param) => {
    await api.get(`/post/${param}`).then(responce => {
      setPost(responce.data.success.content);
    }).catch(err => {
      console.log(err);
    })
  }


  useEffect(async () => {
    await api.get(`/post/${param}`).then(responce => {
      setPost(responce.data.success.content);
    }).catch(err => {
      setPost({ comments: [], author: { _id: '' } })
    })
  }, []);

  const [activeComment, setActiveComment] = useState(null);

  return (
    <main>
      <div className="row">

        <div className="column1">
          <div className="pl-3">
            <div className="has-background-white">
              <div className="main-top">
                <div>EMPTY</div>
              </div>
            </div>
          </div>
        </div>

        <div className="column2">
          <div className="pl-4  pr-4">
            <div className="main-top border-body has-background-white p-4 ">
              <div className=''>
                <Post

                  getPost={getPost}
                  BackendGetPost={BackendGetPost}
                  api={api}
                ></Post>
              </div>
              <div className=''>
                <Comment

                  getPost={getPost}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  BackendGetPost={BackendGetPost}
                  api={api}
                ></Comment>
              </div>
            </div>
          </div>
        </div>

        <div className="column1">
          <div className="pl-3">
            <div className="has-background-white">
              <div className="main-top">
                <div>EMPTY</div>
              </div>
            </div>
          </div>
        </div>

      </div >

    </main>
  );
}


export default PostBody;