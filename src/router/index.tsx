import Erorr from "@/views/403"
import Login from "@/views/login/Login"
import Welcome from "@/views/Welcome"
import { createBrowserRouter, Navigate } from "react-router-dom"
import NotFound from "../views/404"

export const router = [
  {
    path: "/",
    element: <Navigate to='/login' />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/welcome",
    element: <Welcome />
  },
  {
    path: "/403",
    element: <Erorr />
  },
  {
    path: "*",
    element: <Navigate to='/404' />
  },
  {
    path: "/404",
    element: <NotFound />
  }
]

export default createBrowserRouter(router)
