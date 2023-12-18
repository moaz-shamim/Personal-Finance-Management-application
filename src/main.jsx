import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, Login } from "./components/index.js";

import Home from "./pages/Home.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import Signup from "./pages/Signup.jsx";
import EditExpense from "./pages/EditExpense.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/add-expense",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddExpense />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-expense/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditExpense />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
