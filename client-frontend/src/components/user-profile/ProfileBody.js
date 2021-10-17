import React, { useState, useEffect } from "react";
import './Body.css'
import NewPost from "./NewPost";
import Post from "./Posts";
import Profile from "./Profile";
import axios from 'axios';
const Body = () => {

  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });

  const [getUser, setUser] = useState({ username: '', followers: '', following: '' });
  const [getUserPosts, setUserPosts] = useState([]);

  const [getTextarea, setTextarea] = useState('');
  const [getPostError, setPostError] = useState(false);

  const selectValue = (event) => {
    setTextarea(event.target.value)
  }


  const createUserPost = async () => {
    await api.post(`/post`, { message: getTextarea }, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZjdiMTRiMDQwNjQzMmU0ZDE0NzAiLCJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJpYXQiOjE2MzQzNzMwMDgsImV4cCI6MTYzNDk3NzgwOH0.wxOXmAJBM9orovCyryBtBp5BX1F5dducLZY2nmM4G14` } })
      .then(res => {
        console.log('[createUserPost] -', res);
        setTextarea('');
        AxiosGetPosts();
        setPostError(false);
      }).catch(err => {
        setPostError(err.response.data)
      })
  }




  const AxiosGetPosts = async () => {
    const res = await api.get(`/profile/aaa`);
    setUser(res.data.success.content);
    setUserPosts(res.data.success.content.posts);
  }

  const userTest = (childData) => {
    // this.setState({message: childData})
    AxiosGetPosts();
  }

  useEffect(async () => {
    const res = await api.get(`/profile/aaa`);
    setUser(res.data.success.content);
    setUserPosts(res.data.success.content.posts);
  }, []);

  return (
    <main>
      <div className="row">

        <div className="column1 ">
          <div className="pr-3">
            <div className="has-background-white">
              <Profile userInfo={getUser}></Profile>
            </div >
          </div >
        </div >
        <div className="column2">
          <div className="pl-4  pr-4">
            <NewPost selectValue={selectValue} createUserPost={createUserPost} getTextarea={getTextarea} getPostError={getPostError}></NewPost>
            {getUserPosts.map((result, index) => (
              <Post key={index} userInfo={getUser} postInfo={result} userTest={userTest}></Post>
            ))}
          </div>
        </div>
        <div className="column1">
          <div className="pl-3">
            <div className="has-background-white">
              <div className="main-top">
                <p>NOTHING</p>
              </div>
            </div>
          </div>
        </div>

      </div >

    </main>
  );
}

export default Body;