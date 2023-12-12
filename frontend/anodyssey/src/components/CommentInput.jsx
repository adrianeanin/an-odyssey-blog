import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="blog-comment-form">
      <div>
        <label htmlFor="commentName">Name:</label>
        <input
          type="text"
          id="commentName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="commentText">Comment:</label>
        <textarea
          id="commntText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Submit Comment</button>
      </div>
    </form>
  );
};

export default CommentInput;
