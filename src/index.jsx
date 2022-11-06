import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { LoginForm, SignupForm } from "./components/ConnectForm";
import ErrorPage from "./page/ErrorPage";
import { Site } from "./page/Site";
import { Main } from "./Main";
import { Auth, loaderAuth } from "./components/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/site/" />
      },
      {
        path: "login/",
        element: <LoginForm />
      },
      {
        path: "signup/",
        element: <SignupForm />
      },
      {
        path: "site/",
        element: <Auth><Site /></Auth>,
        loader: loaderAuth,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

