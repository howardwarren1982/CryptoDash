import React from "react"
import SignUp from "../components/signup.component/SignUp"
import { Link } from "gatsby"

const register = () => {
  return (
    <div>
      <SignUp />
      <Link to="/">Login</Link>
    </div>
  )
}

export default register
