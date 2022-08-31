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
      <div className="sign_up_error_msg">
        <h1>Error: {error.message}</h1>
      </div>
    )
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (user) {
    return (
      <div className="register_success">
        <h1>Registered User: {user.email}</h1>
      </div>
    )
  }

  const signUp = async () => {
    // if password not match, show error

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }

    //validate email

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())) {
      alert("Invalid email")
      return
    }

    try {
      await createUserWithEmailAndPassword(email, password)
      //wait for 3 seconds
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (e) {
      console.log(e)
      alert(e.message)
    }
  }

  const handleKeypress = e => {
    if (e.code === "Enter") {
      signUp()
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
          onKeyPress={handleKeypress}
        />
        <input
          className="password-signup"
          id="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <input
          className="password-signup"
          id="confirmPassword"
          type="password"
          placeholder="confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <button className="signin-btn" onClick={signUp}>
          Register
        </button>
        <Link className="link-to-login" to="/">
          Login
        </Link>
      </div>
    </div>
  )
}

export default SignUp
