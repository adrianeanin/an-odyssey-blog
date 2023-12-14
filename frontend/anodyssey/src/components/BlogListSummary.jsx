import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";

const BlogListSummary = ({ title, items, categoryPath }) => {
  const recentItems = items.slice(0, 3);

  return (
    <div className="blog-list-control">
      <h3>{title}</h3>
      <ul>
        {recentItems.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </ul>
      <NavLink to={`/${categoryPath}`} activeclassname="active-link">
        View All
      </NavLink>
    </div>
  );
};

BlogListSummary.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryPath: PropTypes.string.isRequired,
};

export default BlogListSummary;
