import { createBrowserRouter } from "react-router-dom";
import AccountForm from "../pages/loginAndRegister";

import App from "../App";
/**
 * The router configuration for the application.
 */
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/loginAndRegister",
          element: <AccountForm />,
        },
      ],
    },
  ]);