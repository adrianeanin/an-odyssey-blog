import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blog";
import MDEditor from "@uiw/react-md-editor";

const PostInput = ({ handleClick, toUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    body: "",
    quote: "",
    quoteAuthor: "",
    primaryImage: { image: "", altText: "" },
    cite: "",
    isPublished: false,
    tags: [],
  });

  const { handleSubmit, handleEdit } = handleClick;
  const { idToUpdate, currentEditTitle } = toUpdate;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

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
      quoteAuthor: "",
      primaryImage: { image: "", altText: "" },
      cite: "",
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

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({ ...prevData, body: content }));
  };

  const handleImageChange = (e, imageType) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,

      [`${imageType}Image`]: {
        ...prevData[`${imageType}Image`],
        [name]: value,
      },
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

        <label htmlFor="body">
          Body:
          <MDEditor
            value={formData.body}
            onChange={handleEditorChange}
            id="body"
            name="body"
          />
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
          QuoteAuthor:
          <input
            type="text"
            name="quoteAuthor"
            value={formData.quoteAuthor}
            onChange={handleChange}
          />
        </label>

        <label>
          Cite:
          <input
            type="text"
            name="cite"
            value={formData.cite}
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
          Primary Image URL:
          <input
            type="text"
            name="image"
            value={formData.primaryImage.image}
            onChange={(e) => handleImageChange(e, "primary")}
          />
        </label>

        <label>
          Primary Image Alt Text:
          <input
            type="text"
            name="altText"
            value={formData.primaryImage.altText}
            onChange={(e) => handleImageChange(e, "primary")}
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
