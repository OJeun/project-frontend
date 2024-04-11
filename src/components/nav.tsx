import { useEffect, useState } from "react";

const Nav = () => {
  const [authToken, setAuthToken] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false); // State to control navbar collapse

  useEffect(() => {
    // Check if authToken exists in localStorage
    const authTokenFromStorage = localStorage.getItem("token");
    if (authTokenFromStorage) {
      setAuthToken(authTokenFromStorage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setAuthToken("");
    window.location.href =
      "/loginAndRegister?status=login&message=" +
      "log out successful" +
      "&error=false";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary p-3"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            AIStylist
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)} // Toggle navbar collapse state
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarColor01"
          >
            <ul className="navbar-nav ms-auto">
              {" "}
              {/* Change me-auto to ms-auto for right alignment */}
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              {authToken ? (
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    Profile
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/loginAndRegister">
                    Login
                  </a>
                </li>
              )}
              {authToken && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={handleLogout}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
