import { useState } from "react";

const CommentForm = ({ submitLabel, hasCancelButton = false, handleCancel, initialText = "", }) => {
  const [text, setText] = useState(initialText);

  const isTextareaDisabled = text.length === 0;

  return (
    <form>
      <textarea className="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="comment-form-button" disabled={isTextareaDisabled}>{submitLabel}</button>

      {hasCancelButton && (<button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>Cancel</button>)}

    </form>
  );
};

export default CommentForm;