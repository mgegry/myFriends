import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Root from "./pages/Root";
import Home from "./pages/content/user/Home";
import Profile from "./pages/content/user/Profile";
import Notifications from "./pages/content/user/Notifications";
import Settings from "./pages/content/user/Settings";
import UserProfile from "./pages/content/user/UserProfile";
import HomeAdmin from "./pages/content/admin/HomeAdmin";
import UserList from "./pages/content/admin/UserList";
import UserItem from "./pages/content/admin/UserItem";
import PostsUserAdmin from "./components/admin/PostsUserAdmin";
import CommentsUserAdmin from "./components/admin/CommentsUserAdmin";
import LikesUserAdmin from "./components/admin/LikesUserAdmin";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/:username",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
    children: [
      { path: "/admin", element: <UserList /> },
      {
        path: "/admin/users/:userId",
        element: <UserItem />,
        children: [
          {
            path: "/admin/users/:userId/posts",
            element: <PostsUserAdmin />,
          },
          {
            path: "/admin/users/:userId/comments",
            element: <CommentsUserAdmin />,
          },
          {
            path: "/admin/users/:userId/likes",
            element: <LikesUserAdmin />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
