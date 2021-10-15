import React from "react";
import axios from 'axios';
const Post = ({ postInfo, userInfo, userTest }) => {
  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });

  const deleteUserPost = async () => {
    console.log(postInfo._id);
    await api.delete(`/post/remove/${postInfo._id}`, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZjdiMTRiMDQwNjQzMmU0ZDE0NzAiLCJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJpYXQiOjE2MzQzMjk2MTksImV4cCI6MTYzNDMzMTQxOX0.1owp5p5Mv4AGGqU6HO2y6P-523B_l29hK8gBU875i7Q` } })
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
          <a href="/">Comments {postInfo.comments.length}</a>
        </div>
      </div>
    </div>
  );
}

export default Post;