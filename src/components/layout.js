import * as React from "react"
import "./normalize.scss"
import "./layout.scss"

import Header from "./header"


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <>
      {children}
      </>
    </>
  )
}

export default Layout
