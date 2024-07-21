import "./App.less"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { ConfigProvider, App as AntdApp } from "antd"
import AntdGlobal from "./utils/AntdGlobal"

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
