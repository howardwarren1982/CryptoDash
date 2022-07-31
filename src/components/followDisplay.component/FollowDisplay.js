import React from "react"
import "./followDisplayStyle.scss"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"
import { useSelectionUpdateContext } from "../../utils/context/SelectionContext"
import { cryptoCoinList } from "../../data/appData"

function FollowDisplay() {
  const auth = getAuth(app)
  const setSelection = useSelectionUpdateContext()
  const [followingList, setFollowingList] = useState()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [value] = useDocument(doc(db, "Follow", user?.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    setFollowingList(value?.data().exchange)
  }, [value])

  let handelClick

  return (
    <div className="following-box">
      <h3>Following</h3>
      <div className="border"></div>
      {followingList?.map(item => {
        return <h5 onClick={e => setSelection(e.target.innerText)}>{item}</h5>
      })}
    </div>
  )
}

export default FollowDisplay
