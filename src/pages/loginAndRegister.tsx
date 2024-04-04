import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignUpPage from "../components/signup";
import LoginPage from "../components/login";

const Register = () => {
  const navigate = useNavigate();
  const { status } = useParams(); // Get the status parameter from the URL

  const handleLoginClick = () => {
    navigate("/loginAndRegister?status=login"); // Navigate to login page
  };

  const handleSignupClick = () => {
    navigate("/loginAndRegister?status=signup"); // Navigate to signup page
  };

  // Render the appropriate component based on the status parameter
  const renderComponent = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const status = params.get("status");
    if (status == "login") {
      return <LoginPage />;
    } else if (status == "signup") {
      return <SignUpPage />;
    } else {
      // Default to SignUpPage if status is not specified or unknown
      return <LoginPage />;
    }
  };

  return (
    <section>
      <div className="container p-5">
        <div className="card bg-secondary mb-3 text-center">
          <div className="card-header ">
            <ul className="nav nav-pills card-header-pills justify-content-center">
              <li className="nav-item">
                <button className="nav-link" onClick={handleLoginClick}>
                  LOGIN
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleSignupClick}>
                  NEW ACCOUNT
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body text-start">{renderComponent()}</div>
        </div>
      </div>
    </section>
  );
};

export default Register;
