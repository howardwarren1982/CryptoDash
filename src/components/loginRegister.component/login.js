import { Link, navigate } from "gatsby"
import React from "react"
import { getAuth, signOut } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
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
    const email = document.getElementById("email").value
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())) {
      alert("Invalid email")
      return
    }

    signInWithEmailAndPassword(email, password)
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <Link to="register">Sign Up</Link>
    </div>
  )
}

export default Login
