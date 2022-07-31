import { Link, navigate } from "gatsby"
import React from "react"
import { getAuth, signOut } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import Layout from "../layout"
import "./loginStyle.scss"

function Login() {
  const auth = getAuth(app)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    )
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
        {navigate("dashBoard")}
      </div>
    )
  }
  const signIn = () => {
    //validate email
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())) {
      alert("Invalid email")
      return
    }

    signInWithEmailAndPassword(email, password)
  }

  return (
    <div className="login-screen">
      <div className="blockBG">
        <h1 className="login-header">Login</h1>
        <input
          className="email-signin"
          id="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          autocomplete="off"
          className="password-signin"
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="signin-btn" onClick={signIn}>
          Sign In
        </button>
        <Link className="register-link" to="register">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Login
