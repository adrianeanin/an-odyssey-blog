import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { BlogContext } from "../BlogContext";

const BlogList = ({ title }) => {
  const blogs = useContext(BlogContext);
  const allBlogs = Object.values(blogs).flat();

  const [displayedBlogs, setDisplayedBlogs] = useState(6);
  const [expanded, setExpanded] = useState(false);
  const initialBlogs = allBlogs.slice(0, displayedBlogs);

  const handleExpand = () => {
    setExpanded(!expanded);
    setDisplayedBlogs(6);
  };

  return (
    <>
      <div className="blog-list">
        <h2>{title}</h2>
        <p>Some cool subtext</p>

        <div className="blog-list-view">
          {expanded
            ? allBlogs.map((blog, index) => <BlogCard key={index} {...blog} />)
            : initialBlogs.map((blog, index) => (
                <Link to={`/blog/${blog.id}`} key={index}>
                  <BlogCard {...blog} />
                </Link>
              ))}
        </div>

        {allBlogs.length > displayedBlogs && (
          <button onClick={handleExpand}>
            {expanded ? "Collapse" : "More Articles"}
          </button>
        )}
      </div>
    </>
  );
};

BlogList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BlogList;
