import PropTypes from "prop-types";

const Form = ({ title }) => {
  return (
    <>
      <form className="form">
        <h1>{title}</h1>

        {title === "Signup" ? (
          <input type="text" className="input" placeholder="Name" />
        ) : (
          " "
        )}
        <input type="text" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />
        <button>Submit</button>
      </form>
    </>
  );
};

Form.propTypes = {
  title: PropTypes.string,
};

export default Form;
