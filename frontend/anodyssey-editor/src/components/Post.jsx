import PropTypes from "prop-types";
import { useState } from "react";
import blogService from "../services/blog";
import MDEditor from "@uiw/react-md-editor";

const Post = ({
  title,
  subTitle,
  body,
  quote,
  isPublished,
  author,
  tags,
  id,
  comments,
  createdAt,
  onDelete,
  handleClick,
  isEditing,
  setEdit,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");
  const { handleSubmit, toggleInputVisibility } = handleClick;
  const { setIsEditing, setIdToUpdate, setCurrentEditTitle } = setEdit;
  const [isPostPublished, setIsPostPublished] = useState(isPublished);

  const handleDeleteClick = async () => {
    await onDelete(id);
  };

  const handleEditClick = () => {
    setIdToUpdate(id);
    setIsEditing(true);
    setCurrentEditTitle(title);
  };

  const handleTogglePublish = async () => {
    try {
      await blogService.togglePublish(id, {
        title,
        subTitle,
        body,
        quote,
      });
      setIsPostPublished((prevIsPublished) => !prevIsPublished);
    } catch (error) {
      console.error("Error toggling publish status:", error);
      // Revert the local state if there's an error
      setIsPostPublished((prevIsPublished) => !prevIsPublished);
    }
  };

  const onDeleteComment = async (id, commentId) => {
    try {
      await blogService.removeComment(id, commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      {!isEditing && (
        <div>
          <hr />
          <h2>{title}</h2>
          <h4>{subTitle}</h4>

          <MDEditor.Markdown source={body} style={{ whiteSpace: "pre-wrap" }} />

          <blockquote>{quote}</blockquote>
          <p>{isPostPublished ? "Published" : "Not Published"}</p>
          <p>{author}</p>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.name}: </strong>
                {comment.text}
                <button
                  onClick={() => {
                    onDeleteComment(id, comment._id);
                    handleSubmit();
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <p>{formattedDate}</p>

          <button
            onClick={() => {
              handleEditClick(), toggleInputVisibility();
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleTogglePublish(), handleSubmit();
            }}
          >
            {isPostPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => {
              handleDeleteClick();
              handleSubmit();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  isPublished: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.object.isRequired,
  setEdit: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default Post;
