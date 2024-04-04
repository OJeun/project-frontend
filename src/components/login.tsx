import { useState } from "react";
// import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const baseURL = "http://localhost:8888";

  //   const handleLogin = async () => {
  //     const response = await axios.post(`${baseURL}/api/login`, {
  //       email,
  //       password,
  //     });
  //     console.log(response.data);
  //     localStorage.setItem("token", response.data.authorisation.token);
  //   };
  return (
    <section>
      <form className="justify-content-center">
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
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
