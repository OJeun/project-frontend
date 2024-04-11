import { Outlet } from "react-router";
import "./../public/bootstrap.css";
import "./App.css";
import AlertComponent from "./components/AlertComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AlertComponent />
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
