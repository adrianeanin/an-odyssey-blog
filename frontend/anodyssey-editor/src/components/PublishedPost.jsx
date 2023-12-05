import PropTypes from "prop-types";

const PublishedPost = ({
  title,
  subTitle,
  body,
  quote,
  isPublished,
  author,
  tags,
  id,
  createdAt,
  onDelete,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

  const handleDeleteClick = async () => {
    await onDelete(id);
  };

  return (
    <>
      <div>
        <hr />
        <h2>{title}</h2>
        <h4>{subTitle}</h4>
        <p>{body}</p>
        <blockquote>{quote}</blockquote>
        <p>{isPublished ? "Published" : "Not Published"}</p>
        <p>{author}</p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>

        <p>{formattedDate}</p>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </>
  );
};

PublishedPost.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  isPublished: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PublishedPost;
