import React from "react"
import { navigate, Link } from "gatsby"
import { useState } from "react"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import "./signupStyle.scss"

const SignUp = () => {
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

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
        <p>Registered User: {user.email}</p>
      </div>
    )
  }

  const signUp = () => {
    // if password not match, show error

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    //validate email

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())) {
      alert("Invalid email")
      return
    }

    createUserWithEmailAndPassword(email, password)
    {
      navigate("/")
    }
  }

  return (
    <div className="template">
      <div className="signup-screen">
        <h1>Sign Up</h1>
        <input
          className="email-signup"
          id="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="password-signup"
          id="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="password-signup"
          id="confirmPassword"
          type="password"
          placeholder="confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button className="signin-btn" onClick={signUp}>
          Register
        </button>
        <Link to="/">Login</Link>
      </div>
    </div>
  )
}

export default SignUp
