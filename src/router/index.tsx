/**
 * 路由目录
 */
import Erorr from "@/views/403"
import Login from "@/views/login/Login"
import Welcome from "@/views/welcome/Welcome"
import { createBrowserRouter, Navigate } from "react-router-dom"
import NotFound from "@/views/404"
import Layout from "@/layout"
import Dashboard from "@/views/dashboard"
import UserList from "@/views/system/user/UserList"
import DeptList from "@/views/system/dept"
import MenuList from "@/views/system/menu"

export const router = [
  {
    path: "/",
    // element: <Navigate to='/login' />
    element: <Navigate to='/welcome' />
  },
  {
    id: "layout",
    element: <Layout />,
    // loader: AuthLoader,
    children: [
      {
        path: "/welcome",
        element: <Welcome />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/userList",
        element: <UserList />
      },
      {
        path: "/deptList",
        element: <DeptList />
      },
      {
        path: "/menuList",
        element: <MenuList />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
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
