import CommentInput from "./CommentInput";
import PropTypes from "prop-types";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const CommentSection = ({ blogId, comments }) => {
  const { updateBlogs } = useContext(BlogContext);

  const handleCommentSubmit = (commentData) => {
    updateBlogs(blogId, commentData);
  };

  return (
    <>
      <div className="blog-comment-section">
        <CommentInput onSubmit={handleCommentSubmit} />

        <ul className="blog-comments | spacer">
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.name}: </strong>
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

CommentSection.propTypes = {
  blogId: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func,
};

export default CommentSection;
