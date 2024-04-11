import { createBrowserRouter, RouteObject } from "react-router-dom";
import AccountForm from "../pages/loginAndRegister";
import Home from "../pages/home";
import ItemDetail from "../pages/detail";
import Profile from "../pages/profile";

const routes: RouteObject[] = [
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
];

export const router = createBrowserRouter(routes);
