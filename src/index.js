import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./routes/index";
import { store } from './services/store'
import { Provider } from 'react-redux'
import studio from '@theatre/studio'
import '@theatre/core'
import Loader2 from "./layouts/Loader2";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Loader2>
      <RouterProvider router={router} />
    </Loader2>
  </Provider>
);
