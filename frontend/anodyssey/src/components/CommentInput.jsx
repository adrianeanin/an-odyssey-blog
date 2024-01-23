import { useState } from "react";
import PropTypes from "prop-types";

const CommentInput = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, text });
    setName("");
    setText("");
  };

  return (
    <div className="form-wrapper | spacer">
      <form onSubmit={handleSubmit} className="blog-comment-form">
        <h2>Add a comment</h2>

        <div className="form-input">
          <label htmlFor="commentName">Name:</label>
          <input
            type="text"
            id="commentName"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="commentText">Comment:</label>
          <textarea
            id="commentText"
            placeholder="Comment"
            maxLength={150}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

CommentInput.propTypes = {
  onSubmit: PropTypes.func,
};

export default CommentInput;
