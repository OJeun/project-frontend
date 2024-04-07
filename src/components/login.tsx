import { useState } from "react";
import axios from "axios";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
    const response = await axios.post(apiUrl + "/api/login", {
      email,
      password,
    });
    if (response.data.error) {
      window.location.href =
        "/loginAndRegister?status=login&message=" +
        response.data.error +
        "&error=true";
      return;
    }
    console.log(response.data);
    console.log(response.data.authorisation.token);
    localStorage.setItem("token", response.data.authorisation.token);
    window.location.href = "/";

  };
  return (
    <section>
      <form className="justify-content-center" onSubmit={handleLogin}>
        <div className="p-3 m-5" style={{ minHeight: "25rem" }}>
          <h1 className="text-center mb-5">Login</h1>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="example@abc.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
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
            ></input>
          </div>
          <button onClick={handleLogin} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
