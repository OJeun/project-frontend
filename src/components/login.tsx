import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(apiUrl + "/api/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }
      localStorage.setItem("token", response.data.authorisation.token);
      localStorage.setItem("userId", JSON.stringify(response.data.user.id));
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("name", response.data.user.name);
      window.location.href = "/";
    } catch (error: any) {
      toast.error(
        `${error.response.data.message}. Please double check email and password.`
      );
    }
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
          <div className="mb-4">
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleLogin} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
