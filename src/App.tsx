// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./../public/bootstrap.css";
import "./App.css";
import { Outlet } from "react-router";
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
