import { Outlet } from "react-router";
import "./../public/bootstrap.css";
import "./App.css";
import AlertComponent from "./components/AlertComponent";

function App() {
  return (
    <>
      <AlertComponent />
      <Outlet />
    </>
  );
}

export default App;
