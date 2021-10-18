import React, { useState } from "react";
import CommentForm from "./CommentForm";

const Post = ({ getPost, BackendGetPost, api }) => {

  const [activeComment, setActiveComment] = useState(null);
  const [getMessage, setMessage] = useState('');

  const isReply = activeComment && activeComment.value == true && activeComment.id == getPost._id;

  const token = JSON.parse(localStorage.getItem('userData')).token;
  const userId = JSON.parse(localStorage.getItem('userData')).userId;

  const createPostComment = async (commentid, message) => {
    await api.post(`/post/comment/${commentid}`, { message: message }, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log('[createPostComment] -', res);
        setActiveComment(null);
        BackendGetPost(getPost._id)
      }).catch(err => {
        console.log(err)
      })
  }

  const deletePost = async (commentid) => {
    await api.delete(`/post/remove/${commentid}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log('[deletePost] -', res);
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
          {(getPost.author._id == userId) && (
            <div className=" p-0">
              <button className="button is-danger ml-1 is-small is-pulled-right" onClick={() => deletePost(getPost._id)}>delete</button>
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

      {isReply && (<CommentForm
        formID={getPost._id}
        setActiveComment={setActiveComment}
        createComment={createPostComment}
        getMessage={getMessage}
        setMessage={setMessage}
      />)}
    </div>
  );
}


export default Post;