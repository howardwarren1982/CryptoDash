import React from "react"
import { navigate } from "gatsby"
import { useState } from "react"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import "./signupStyle.scss"

const SignUp = () => {
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    //validate email
    const email = document.getElementById("email").value
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
    <div className="App">
      <h1>Sign Up</h1>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <label>confirm password</label>
      <input id="confirmPassword" type="password" />
      <button onClick={signUp}>Register</button>
    </div>
  )
}

export default SignUp
