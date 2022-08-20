import React from "react"
import { useContext, useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"

const UserContext = React.createContext()

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState("")

  const auth = getAuth(app)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const userInformation = {
          userId: user?.uid,
          userEmail: user?.email,
          wholeUser: user,
        }

        setUserInfo(userInformation)
      } else {
        const userInformation = {
          userId: "none",
        }
        setUserInfo(userInformation)
      }
    })
  }, [])

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  )
}
