import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State variable for password match validation
  const [isEmailValid, setIsEmailValid] = useState(true); // State variable for email validation
  const apiUrl = import.meta.env.VITE_API_URL.toString();

  const handleRegister = async () => {
    if (password.length < 6) {
      // Display an error message or handle the validation as per your UI requirements
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      await axios.post(apiUrl + "/api/register", {
        name,
        email,
        password,
      });

      window.location.href =
        "/loginAndRegister?status=login&message=Account created successfully. Please login." +
        "&error=false";
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(email));
  };

  return (
    <section>
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
        <button onClick={handleRegister} className="btn btn-primary">
          Submit
        </button>
      </div>
    </section>
  );
};

export default SignUpPage;
