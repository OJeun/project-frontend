import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State variable for password match validation
  const [isEmailValid, setIsEmailValid] = useState(true); // State variable for email validation
  //   const baseURL = "http://localhost:8888";
  //   const navigate = useNavigate();

  //   const handleRegister = async () => {
  //     const response = await axios.post(`${baseURL}/api/register`, {
  //       name,
  //       email,
  //       password,
  //     });
  //     // Redirect to /login with message parameter
  //     navigate("Login", { state: { message: response.data.message } });
  //     console.log(response.data);
  //   };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(email));
  };

  return (
    <section>
      <form className="justify-content-center">
        <div
          className="p-3 m-5 justify-content-center"
          style={{ minHeight: "25rem" }}
        >
          <h1 className="text-center mb-5">Create a New Account</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Ex. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${!isEmailValid && "is-invalid"}`}
              id="email"
              placeholder="jane@doe.ca"
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setEmail(value);
                validateEmail();
              }}
              required
            />
            {!isEmailValid && (
              <div className="invalid-feedback">
                Please enter a valid email address
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              className={`form-control ${!passwordsMatch && "is-invalid"}`}
              id="confirm_password"
              placeholder="******"
              onChange={(e) => {
                console.log(confirmPassword);
                setConfirmPassword(e.target.value);
                setPasswordsMatch(e.target.value === password); // Check if passwords match on input change
              }}
              required
            />
            {!passwordsMatch && (
              <div className="invalid-feedback">Passwords do not match</div>
            )}
          </div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
