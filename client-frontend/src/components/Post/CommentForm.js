import React, { useState, useEffect } from "react";

const CommentForm = ({ formID, setActiveComment, createComment, setMessage, getMessage }) => {

  return (
    <div className='columns m-0 mb-4 '>
      <div className='column p-0   '>
        <textarea className="textarea is-success is-small" onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className='column is-2 p-0   '>
        <div className="mt-0 ml-1 mr-1 mb-1 ">
          <button className="button is-success is-small" onClick={() => { createComment(formID, getMessage) }}>Submit</button>
        </div>
        <div className="m-1 ">
          <button className="button is-warning  is-small" onClick={() => { setActiveComment(null) }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm;