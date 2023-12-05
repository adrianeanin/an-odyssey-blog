import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blog";

const PostInput = ({ handleClick }) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    body: "",
    quote: "",
    isPublished: false,
    tags: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogService.create(formData);

      setFormData({
        title: "",
        subTitle: "",
        body: "",
        quote: "",
        isPublished: false,
        tags: [],
      });
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Subtitle:
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
          />
        </label>

        <label>
          Body:
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
          ></textarea>
        </label>

        <label>
          Quote:
          <input
            type="text"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
          />
        </label>

        <label>
          Is Published:
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
        </label>

        <label>
          Tags:
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={(e) => {
              const tagsArray = e.target.value
                .split(",")
                .map((tag) => tag.trim());
              setFormData((prevData) => ({ ...prevData, tags: tagsArray }));
            }}
          />
        </label>

        <button type="submit" onClick={handleClick}>
          Create Post
        </button>
      </form>
    </>
  );
};

PostInput.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default PostInput;
