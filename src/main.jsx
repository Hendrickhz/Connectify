import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/authContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/Home.jsx";
import RedirectAuthenticated from "./components/routes/RedirectAuthenticated.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import ProtectedLayout from "./components/layout/ProtectedLayout.jsx";
import Create from "./pages/Create.jsx";
import Edit from "./pages/Edit.jsx";
import Detail from "./pages/Detail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Trash from "./pages/Trash.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectAuthenticated>
        <Login />
      </RedirectAuthenticated>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectAuthenticated>
        {" "}
        <Register />
      </RedirectAuthenticated>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "contact/:id",
        element: <Detail />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
