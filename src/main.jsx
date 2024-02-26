import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Login, Register, Chats } from "./pages";
import { SetAvatar } from "./components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/store";
const routes = createBrowserRouter([
  {
    path: "/",
    element: /*localStorage.getItem("auth_token") ? <Chats /> :*/ <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setavatar",
    element: <SetAvatar />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
