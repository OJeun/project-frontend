import { createBrowserRouter } from "react-router-dom";
import AccountForm from "../pages/loginAndRegister";
import Home from "../pages/home";
import ItemDetail from "../pages/detail";
import Profile from "../pages/profile";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/loginAndRegister",
        element: <AccountForm />,
      },
      {
        path: "/detail",
        element: <ItemDetail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
