import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blog";

const PostInput = ({ handleClick, toUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    body: "",
    quote: "",
    isPublished: false,
    tags: [],
  });

  const { handleSubmit, handleEdit } = handleClick;
  const { idToUpdate, currentEditTitle } = toUpdate;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (idToUpdate) {
      const nonEmptyFields = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== "") {
          acc[key] = formData[key];
        }
        return acc;
      }, {});

      handleEdit(nonEmptyFields);
    } else {
      await blogService.create(formData);
    }

    setFormData({
      title: "",
      subTitle: "",
      body: "",
      quote: "",
      isPublished: false,
      tags: [],
    });
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
      <h1>{idToUpdate ? "Edit Post" : "Create Post"}</h1>

      <h3>{idToUpdate ? `Currently updating ${currentEditTitle}` : ""}</h3>

      <form onSubmit={handleFormSubmit}>
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

        <button type="submit" onClick={handleSubmit}>
          {idToUpdate ? "Edit Post" : "Create Post"}
        </button>
      </form>
    </>
  );
};

PostInput.propTypes = {
  handleClick: PropTypes.object.isRequired,
  toUpdate: PropTypes.object,
};

export default PostInput;
