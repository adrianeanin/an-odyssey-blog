import axios from "axios";
import PropTypes from "prop-types";
import blogService from "../services/blog";

import { useState } from "react";
import { apiUrl } from "../services/config";

const Form = ({ title, onLoginSuccess, setActiveForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";
      let action = "";

      if (title === "Signup") {
        endpoint = "signup";
        action = "registered";
      } else if (title === "Login") {
        endpoint = "login";
        action = "logged in";
      }

      const response = await axios.post(
        `${apiUrl}/api/users/${endpoint}`,
        formData
      );
      console.log(`User ${action} successfully`);

      const { token, email, name } = response.data;

      // Save token
      blogService.setToken(token);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      if (title === "Login") {
        onLoginSuccess({ email, name });
      }
    } catch (error) {
      console.error(`Error ${title.toLowerCase()}ing user:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h1>{title}</h1>

        {title === "Signup" && (
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <input
          type="text"
          name="email"
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{title === "Login" ? "Login" : "Signup"}</button>

        {title === "Login" && (
          <div>
            Don’t have an account yet?
            <button onClick={() => setActiveForm("Signup")}>Sign up</button>
          </div>
        )}
      </form>
    </div>
    </>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  onLoginSuccess: PropTypes.func,
  setActiveForm: PropTypes.func,
};

export default Form;
