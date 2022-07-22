import React from "react"
import "./followBtn.style.scss"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, setDoc, doc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"

function FollowBtn({ children }) {
  const auth = getAuth(app)
  const selection = useSelectionContext()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [coinList, setToCoinList] = useState([])
  const addToFirestore = useFirebaseFunctions(db, "Follow", user?.uid)
  const [value] = useDocument(doc(db, "Follow", user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  let handelClick

  useEffect(() => {
    setToCoinList(value?.data().exchange)
  }, [value])

  handelClick = () => {
    //if prevCoinList contains selection do not add to firestore
    if (coinList.includes(selection)) {
      return
    }
    const prevCoinList = coinList
    const newCoinList = [...prevCoinList, selection]
    setToCoinList(newCoinList)
    console.log(coinList)
    addToFirestore({ exchange: newCoinList })
  }

  return (
    <div>
      {console.log(coinList)}
      <button onClick={handelClick}>{children}</button>{" "}
    </div>
  )
}

export default FollowBtn
