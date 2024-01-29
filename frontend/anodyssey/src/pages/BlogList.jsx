import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";

const BlogList = ({ title }) => {
  const blogs = useContext(BlogContext);
  const allBlogs = Object.values(blogs).flat();

  const [displayedBlogs, setDisplayedBlogs] = useState(6);
  const [expanded, setExpanded] = useState(false);
  const initialBlogs = allBlogs.slice(0, displayedBlogs);

  console.log(initialBlogs);

  const handleExpand = () => {
    setExpanded(!expanded);
    setDisplayedBlogs(6);
  };

  return (
    <>
      <section className="blog-list">
        <div className="">
          <div className="blog-list-text">
            <h1>{title}</h1>

            <div className="blog-list-subtext">
              {title === "Tech Blogs" ? (
                <p>Traversing the galaxy of code.</p>
              ) : title === "Inspiring Blogs" ? (
                <p>A journey through thoughts.</p>
              ) : title === "Tutorial Blogs" ? (
                <p>A quest of life-long learning.</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="blog-list-view | wrapper">
            {expanded
              ? allBlogs.map((blog, index) => (
                  <Link to={`/blog/${blog.id}`} key={index}>
                    <BlogCard key={index} {...blog} />
                  </Link>
                ))
              : initialBlogs.map((blog, index) => (
                  <Link to={`/blog/${blog.id}`} key={index}>
                    <BlogCard key={index} {...blog} />
                  </Link>
                ))}

            {allBlogs.length > displayedBlogs && (
              <button onClick={handleExpand}>
                {expanded ? "Collapse" : "More Articles"}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

BlogList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BlogList;
