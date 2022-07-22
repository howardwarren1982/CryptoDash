import React from "react"
import "./unfollowbtnStyle.scss"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"

function UnfollowBtn({ children }) {
  const auth = getAuth(app)
  const selection = useSelectionContext()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [coinList, setToCoinList] = useState([])
  const addToFirestore = useFirebaseFunctions(db, "Follow", user.uid)
  const [value] = useDocument(doc(db, "Follow", user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  let handelClick

  useEffect(() => {
    let currentfollowing = value?.data().exchange
    setToCoinList(currentfollowing)
  }, [selection])

  handelClick = () => {
    const newCoinList = coinList.filter(coin => coin !== selection)
    setToCoinList(newCoinList)
    console.log(newCoinList + "34")
    addToFirestore({ exchange: newCoinList })
  }

  return (
    <div>
      <button onClick={handelClick}>{children}</button> <h1>{selection}</h1>
    </div>
  )
}

export default UnfollowBtn
