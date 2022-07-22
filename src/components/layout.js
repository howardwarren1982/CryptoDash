import * as React from "react"
import "./normalize.scss"
import "./layout.scss"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <>
      <div className="app-style">{children}</div>
    </>
  )
}

export default Layout
