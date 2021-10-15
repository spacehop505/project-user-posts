import React, { useState, useEffect } from "react";
const NewPost = ({ selectValue, createUserPost, getTextarea, getPostError }) => {

  return (
    <div className="main-top has-background-white border-body p-2">
      <div className="columns m-0  ">
        <div className="column is-three-quarters">
          <textarea className="textarea is-info" placeholder="Enter Text..." onChange={selectValue} value={getTextarea}></textarea>
        </div>
        <div className="column">
          <button className="button" onClick={createUserPost}>Create Post</button>
        </div>
      </div>
      {getPostError && <div>
        <p className="has-text-danger has-text-weight-bold">Error: {getPostError.message}</p>
      </div>}
    </div>
  );
}

export default NewPost;