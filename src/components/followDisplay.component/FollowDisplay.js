import React from "react"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"

function FollowDisplay() {
  const auth = getAuth(app)
  const [selection, updateSelection] = useSelectionContext()
  const [followingList, setFollowingList] = useState()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  //const [coinList, setToCoinList] = useState([])
  //const addToFirestore = useFirebaseFunctions(db, "Follow", user.uid)
  const [value] = useDocument(doc(db, "Follow", user?.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    console.log(value?.data().exchange)
    setFollowingList(value?.data().exchange)
  }, [value])

  let handelClick

  handelClick = () => {}

  return (
    <div>
      {followingList?.map(item => {
        return <h1>{item}</h1>
      })}
    </div>
  )
}

export default FollowDisplay
