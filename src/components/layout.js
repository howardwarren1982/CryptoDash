import * as React from "react"
import "./normalize.scss"
import "./layout.scss"

const Layout = ({ children }) => {
  return (
    <>
      <div className="app-style">{children}</div>
    </>
  )
}

export default Layout
