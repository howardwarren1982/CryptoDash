import React from "react"
import { cryptoCoinList } from "../../data/appData"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import "./exchangeInfoStyle.scss"
import { getAuth } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, doc } from "firebase/firestore"
import { useDocument } from "react-firebase-hooks/firestore"
import { useState, useEffect } from "react"
import FollowBtn from "../followbtn.component/FollowBtn"
import UnfollowBtn from "../unfollowbtn.component/UnfollowBtn"

function ExtchangeInfo() {
  const auth = getAuth(app)
  const [followingList, setFollowingList] = useState()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [value] = useDocument(doc(db, "Follow", user?.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  let selection = useSelectionContext()

  const newCryptoList = cryptoCoinList.filter(item => {
    return item.id === selection
  })

  useEffect(() => {
    setFollowingList(value?.data().exchange)
  }, [value])

  return (
    <div className="exchangeData">
      <h5 className="exchange-name">
        {newCryptoList[0] && newCryptoList[0]["name"]}
      </h5>
      {followingList?.includes(selection) ? (
        <UnfollowBtn>unfollow</UnfollowBtn>
      ) : (
        <FollowBtn>follow</FollowBtn>
      )}
      <div className="exchangeDataTemp">
        <div className="left-side">
          <h5>
            Trust score: {newCryptoList[0] && newCryptoList[0]["trust_score"]}
          </h5>
          <h5>
            Trade colume 24h btc:{" "}
            {newCryptoList[0] && newCryptoList[0]["trade_volume_24h_btc"]}
          </h5>
          <h5>
            Trust score rank:
            {newCryptoList[0] && newCryptoList[0]["trust_score_rank"]}
          </h5>
        </div>
        <div className="right-side">
          <h5>Description</h5>
          <p>{newCryptoList[0] && newCryptoList[0]["description"]}</p>
        </div>
      </div>
    </div>
  )
}

export default ExtchangeInfo
