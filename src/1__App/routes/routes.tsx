import { createBrowserRouter } from "react-router";
import { Board } from "../../3__pages/Board/ui/Board.tsx";
import Home from "../../3__pages/Home/Home.tsx";
import Auth from "../../3__pages/Auth/Auth.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import NotFound from "../../3__pages/404/NotFound.tsx";

export const routes = createBrowserRouter([
  {path: "/board/:name", element: <ProtectedRoute><Board /></ProtectedRoute>},
  {path: "/", element: <ProtectedRoute><Home /></ProtectedRoute>},
  {path: "/login", element: <ProtectedRoute><Auth /></ProtectedRoute>},
  {path: "/register", element: <ProtectedRoute><Auth /></ProtectedRoute>},
  {path: "*", element: <NotFound />}
]);



 