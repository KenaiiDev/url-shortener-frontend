import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/Home";
import "./index.css";
import Shorter from "./pages/Shorter";
import Redirect from "./pages/Redirect";

const router = createBrowserRouter([
  { path: "/shorter/:id", element: <Shorter /> },
  { path: "/shorter", element: <Shorter /> },
  { path: "/", element: <App /> },
  { path: "/:id", element: <Redirect /> },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
