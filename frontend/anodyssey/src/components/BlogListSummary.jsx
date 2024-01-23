import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";

const BlogListSummary = ({ title, items, categoryPath }) => {
  const recentItems = items.slice(0, 3);

  return (
    <div className="summary-list-control | flow | wrapper">
      <div className="summary-list-control-title">
        <h3>{title}</h3>
        <NavLink to={`/${categoryPath}`}>View All</NavLink>
      </div>

      <div className="summary-list-view">
        {recentItems.map((item) => (
          <Link key={item.id} to={`/blog/${item.id}`}>
            <BlogCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

BlogListSummary.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryPath: PropTypes.string.isRequired,
};

export default BlogListSummary;
