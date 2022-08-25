import React from "react"
import "./followDisplayStyle.scss"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc } from "firebase/firestore"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"
import { useSelectionUpdateContext } from "../../utils/context/SelectionContext"
import { mapObjectToArray } from "../../utils/utilFunctions"

function FollowDisplay() {
  const [docRef, setDocRef] = useState()
  const auth = getAuth(app)
  const setSelection = useSelectionUpdateContext()
  const [followingList, setFollowingList] = useState()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDocRef(doc(db, "Follow", user?.uid))
    }
    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [])
  //const docRef = doc(db, "Follow", user?.uid)
  const [value] = useDocument(docRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setFollowingList(mapObjectToArray(value?.data()?.exchange))
    }
    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [value])

  return (
    <div className="following-box">
      <h3>Following</h3>
      <div className="border"></div>
      {followingList?.map((item, index) => {
        return (
          <h5
            key={`${index}${item}`}
            onClick={e => setSelection(e.target.innerText)}
          >
            {item[0]}
          </h5>
        )
      })}
    </div>
  )
}

export default FollowDisplay
