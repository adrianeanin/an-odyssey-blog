import CommentInput from "./CommentInput";
import PropTypes from "prop-types";

const CommentSection = ({ blogId, comments }) => {
  const handleCommentSubmit = (commentData) => {
    console.log("Submitted comment:", commentData);
    // Todo: Post to db
  };

  return (
    <>
      <div className="blog-comment-section">
        <CommentInput onSubmit={handleCommentSubmit} />

        <ul className="blog-comments">
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
};

export default CommentSection;
