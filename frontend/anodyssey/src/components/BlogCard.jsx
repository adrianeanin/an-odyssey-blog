import PropTypes from "prop-types";

const BlogCard = ({ title, subTitle, createdAt, primaryImage }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="card-container">
        <div className="card-container-content">
          <p>{formattedDate}</p>
          <h3>{title}</h3>

          <p>{subTitle}</p>
        </div>

        {primaryImage && (
          <div className="card-container-img">
            <img src={primaryImage.image} alt={primaryImage.altText} />
          </div>
        )}
      </div>
    </>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  primaryImage: PropTypes.object,
};

export default BlogCard;
