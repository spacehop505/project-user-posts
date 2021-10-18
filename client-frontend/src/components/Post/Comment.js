import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import CommentForm from "./CommentForm";

const Comment = ({ getPost, activeComment, setActiveComment, myId, BackendGetPost, api }) => {

  const isReplying = activeComment && activeComment.value == true && activeComment.id == myId;
  const ss = useParams().postId;
  const token = JSON.parse(localStorage.getItem('userData')).token;
  const userId = JSON.parse(localStorage.getItem('userData')).userId;
  const createCommentComment = async (commentid, message) => {
    await api.post(`/comment/comment/${commentid}`, { message: message }, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log('[createUserPost] -', res);
        setActiveComment(null);
        console.log(ss);
        BackendGetPost(ss);
      }).catch(err => {
        console.log(err)
      })
  }


  const [getMessage, setMessage] = useState('');

  const deleteComment = async (commentid) => {
    await api.delete(`/post/comment/remove/${commentid}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log('deleted');
      }).catch(err => {
        console.log(err, 'fail');
      })
  }

  return (
    <div style={{ "marginLeft": "15px", "marginTop": "5px" }}>
      {isReplying && (<CommentForm
        formID={myId}
        setActiveComment={setActiveComment}
        createComment={createCommentComment}
        getMessage={getMessage}
        setMessage={setMessage}
      />)}
      {getPost.comments.length > 0 && (
        <div>
          {getPost.comments.map((reply) => (
            <div className="comment" key={reply._id}>

              <div className="columns m-0">

                <div className="column is-1">
                  <div className="columns pt-1">
                    <figure className="image is-32x32">
                      <img className="is-rounded" alt="" src="https://bulma.io/images/placeholders/32x32.png" />
                    </figure>
                  </div>
                </div>

                <div className="column pl-2 p-0  ">
                  <p className="has-text-weight-bold">{reply.author.username}</p>
                  <p className="is-italic is-size-7">{new Date(reply.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="column p-1 ">
                  {(reply.author._id == userId) && (
                    <div className="p-0">
                      <button className="button p-1 is-danger ml-1 is-small is-pulled-right" onClick={() => deleteComment(reply._id)}>delete</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pl-6 ">
                <span className="ow">{reply.message}</span>
              </div>

              <div className="">
                {true && (<button className="button p-1 is-info is-small" onClick={() => { setActiveComment({ id: reply._id, value: true }) }}>Reply</button>)}
              </div>

              <Comment
                getPost={reply}
                key={reply._id}
                myId={reply._id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                BackendGetPost={BackendGetPost}
                api={api}
              ></Comment>
            </div>

          ))}

        </div>
      )}

    </div>
  )
}


export default Comment;