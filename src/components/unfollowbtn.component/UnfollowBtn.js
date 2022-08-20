import React from "react"
import "./unfollowbtnStyle.scss"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"
import { useUserContext } from "../../utils/context/UserContext"

function UnfollowBtn({ children }) {
  const userInfo = useUserContext()
  const [docRef, setDocRef] = useState()
  const auth = getAuth(app)
  const selection = useSelectionContext()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [coinList, setToCoinList] = useState({})
  const addToFirestore = useFirebaseFunctions(db, "Follow", user?.uid)
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDocRef(doc(db, "Follow", userInfo?.userId))
    }

    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [])
  const [value] = useDocument(docRef, {
    // snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    let isMounted = true
    let currentfollowing = value?.data()?.exchange
    if (isMounted) {
      setToCoinList(currentfollowing)
    }
    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [value])

  const removeKey = (obj, key) => {
    const newCoinList = { ...obj }
    delete newCoinList[key]

    return newCoinList
  }

  //delete coinList[selection]
  const handelClick = () => {
    const newCoinList = removeKey(coinList, selection)
    setToCoinList(newCoinList)
    addToFirestore({ exchange: newCoinList })
  }
  return (
    <div>
      <button onClick={handelClick}>{children}</button>
    </div>
  )
}

export default UnfollowBtn
