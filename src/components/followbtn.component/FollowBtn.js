import React from "react"
import "./followBtn.style.scss"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, setDoc, doc } from "firebase/firestore"
import useFirebaseFunctions from "../../utils/hooks/useFirebaseFunctions"
import { useDocument } from "react-firebase-hooks/firestore"

function FollowBtn() {
  const auth = getAuth(app)
  const selection = useSelectionContext()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const addToFirestore = useFirebaseFunctions(db, "Follow", "uid23", {
    name: "test3",
  })
  const [value, loading, error] = useDocument(doc(db, "Follow", "uid23"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  console.log(value.data())
  return (
    <div>
      {" "}
      <button onClick={addToFirestore}>follow</button>{" "}
    </div>
  )
}

export default FollowBtn
