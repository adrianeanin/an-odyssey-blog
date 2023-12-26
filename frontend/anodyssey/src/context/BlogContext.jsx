import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blog";

export const BlogContext = createContext({
  inspiring: [],
  tech: [],
  tutorials: [],
});

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState({
    inspiring: [],
    tech: [],
    tutorials: [],
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getPublishedPosts();

        console.log("Response", response);

        const inspiringBlogs = response.filter((blog) =>
          blog.tags.map((tag) => tag.toLowerCase()).includes("inspiring")
        );
        const techBlogs = response.filter((blog) =>
          blog.tags.map((tag) => tag.toLowerCase()).includes("tech")
        );
        const tutorialBlogs = response.filter((blog) =>
          blog.tags.map((tag) => tag.toLowerCase()).includes("tutorials")
        );

        setBlogs({
          inspiring: inspiringBlogs,
          tech: techBlogs,
          tutorials: tutorialBlogs,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogs();
  }, []);

  const updateBlogs = async (id, newComment) => {
    try {
      await blogService.addComment(id, newComment);

      setBlogs((prevBlogs) => {
        const updatedBlogs = { ...prevBlogs };

        for (const category in updatedBlogs) {
          updatedBlogs[category] = updatedBlogs[category].map((blog) =>
            blog.id === id
              ? { ...blog, comments: [...blog.comments, newComment] }
              : blog
          );
        }

        return updatedBlogs;
      });
    } catch (error) {
      console.error("Error updating blogs with new comment:", error);
    }
  };

  return (
    <BlogContext.Provider value={{ ...blogs, updateBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
