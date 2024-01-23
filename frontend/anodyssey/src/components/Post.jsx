import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";
import CommentSection from "./CommentSection";

const Post = ({ title, body, createdAt, id, primaryImage, tags, comments }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <>
      <section>
        <article className="blog | wrapper">
          <div className="blog-title">
            <h1 className="blog-text">{title}</h1>
            <p className="blog-date">{formattedDate}</p>
          </div>

          {primaryImage && (
            <div className="blog-primary-image | spacer">
              <img src={primaryImage.image} alt={primaryImage.altText} />
            </div>
          )}

          <MDEditor.Markdown
            source={body}
            style={{ whiteSpace: "pre-wrap" }}
            className="blog-body"
          />

          <ul className="blog-tags">
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>

          <CommentSection blogId={id} comments={comments} />
        </article>
      </section>
    </>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string,
  primaryImage: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default Post;
