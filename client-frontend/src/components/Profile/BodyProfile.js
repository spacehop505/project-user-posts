import React, { useState, useEffect } from "react";
import NewPost from "./PostForm";
import Posts from "./Posts";
import Profile from "./Profile";
import axios from 'axios';

const Body = ({ getToken, getUserId }) => {

  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });

  console.log('getToken', getToken)
  console.log('getUserId', getUserId)
  //const token = JSON.parse(localStorage.getItem('userData')).token;
  // const userId = JSON.parse(localStorage.getItem('userData')).userId;


  const [getUser, setUser] = useState({ username: '', followers: '', following: '' });
  const [getUserPosts, setUserPosts] = useState([]);

  const [getTextarea, setTextarea] = useState('');
  const [getPostError, setPostError] = useState(false);

  const createUserPost = async () => {
    await api.post(`/post`, { message: getTextarea }, { headers: { 'Authorization': `Bearer ${getToken}` } })
      .then(res => {
        setTextarea('');
        backendGetAuthProfile();
        setPostError(false);
      }).catch(err => { setPostError(err.response.data) })
  }

  const backendGetAuthProfile = async () => {
    const res = await api.get(`/profile/auth/${getUserId}`, { headers: { 'Authorization': `Bearer ${getToken}` } })
      .then((res) => {
        setUser(res.data.success.content);
        setUserPosts(res.data.success.content.posts);
      })
      .catch(err => { console.log(err.response) })
  }

  useEffect(async () => {
    await api.get(`/profile/auth/${getUserId}`, { headers: { 'Authorization': `Bearer ${getToken}` } })
      .then((res) => {
        setUser(res.data.success.content);
        setUserPosts(res.data.success.content.posts);
      })
      .catch(err => { console.log(err.response) })
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
            <NewPost
              setTextarea={setTextarea}
              createUserPost={createUserPost}
              getTextarea={getTextarea}
              getPostError={getPostError}
            ></NewPost>

            {getUserPosts.map((result, index) => (
              <Posts
                key={index}
                userInfo={getUser}
                postInfo={result}
                backendGetAuthProfile={backendGetAuthProfile}
                api={api}
              ></Posts>
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