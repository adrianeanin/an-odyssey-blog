import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops, looks like you got lost on your odyssey!</h1>
      <Link to="/">Click here to go home</Link>
    </div>
  );
};

export default ErrorPage;
