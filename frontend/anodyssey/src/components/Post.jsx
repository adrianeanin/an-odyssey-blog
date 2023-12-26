import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";
import CommentSection from "./CommentSection";

const Post = ({
  title,
  body,
  createdAt,
  quote,
  quoteAuthor,
  id,
  cite,
  primaryImage,
  tags,
  comments,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <>
      <article className="blog">
        <h1 className="blog-title">{title}</h1>
        <span className="blog-date">
          <p>{formattedDate}</p> &bull;
        </span>

        {quote ? (
          <div className="blog-quote">
            <blockquote>
              <p>{quote}</p>
            </blockquote>

            <figcaption>
              &ndash; {quoteAuthor}, <cite>{cite}</cite>
            </figcaption>
          </div>
        ) : null}

        {primaryImage && (
          <div className="blog-primary-image">
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
    </>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  quote: PropTypes.string,
  quoteAuthor: PropTypes.string,
  cite: PropTypes.string,
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
