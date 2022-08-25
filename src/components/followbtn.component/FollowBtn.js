import React from "react"
import "./followBtn.style.scss"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"
import { useUserContext } from "../../utils/context/UserContext"

function FollowBtn({ children }) {
  const userInfo = useUserContext()
  const [docRef, setDocRef] = useState()
  const auth = getAuth(app)
  const selection = useSelectionContext()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [coinList, setToCoinList] = useState({})
  useEffect(() => {
    let isMounted = true
    if (isMounted && userInfo) {
      setDocRef(doc(db, "Follow", userInfo?.userId))
    }

    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [])
  const addToFirestore = useFirebaseFunctions(db, "Follow", user?.uid)
  const [value] = useDocument(docRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      setToCoinList(value?.data()?.exchange)
    }

    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [value])

  const handelClick = () => {
    const newCoinList = { ...coinList }
    newCoinList[selection] = selection
    setToCoinList(newCoinList)

    addToFirestore({ exchange: newCoinList })
  }

  return (
    <div>
      <button onClick={handelClick}>{children}</button>{" "}
    </div>
  )
}

export default FollowBtn
