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
import { mapObjectToArray } from "../../utils/utilFunctions"
import useFetch from "../../utils/hooks/useFetch"

function ExtchangeInfo() {
  const [Output] = useFetch(`https://api.coingecko.com/api/v3/exchanges`)
  const [data, setData] = useState()
  const [docRef, setDocRef] = useState()
  const auth = getAuth(app)
  const [followingList, setFollowingList] = useState()
  const [user] = useAuthState(auth)
  const selection = useSelectionContext()
  const db = getFirestore(app)
  let newCryptoList = []

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDocRef(doc(db, "Follow", user?.uid))

      setData(Output)
    }

    return () => {
      console.log("cleaned up")
      isMounted = false
    }
  }, [])

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

  if (data instanceof Array) {
    newCryptoList = data?.filter(item => {
      console.log("using fetched data")
      return item.id === selection
    })
  } else {
    newCryptoList = cryptoCoinList.filter(item => {
      return item.id === selection
    })
  }

  return (
    <div className="exchangeData">
      <h5 className="exchange-name">
        {newCryptoList[0] ? newCryptoList[0]["name"] : "NO DATA"}
      </h5>

      <div className="exchangeDataTemp">
        <div className="left-side">
          {followingList?.flat().includes(selection) ? (
            <UnfollowBtn>unfollow</UnfollowBtn>
          ) : (
            <FollowBtn>follow</FollowBtn>
          )}

          <h5>
            Trade colume 24h btc:{" "}
            {newCryptoList[0] && newCryptoList[0]["trade_volume_24h_btc"]}
          </h5>
          <h5>
            Trust score rank:
            {newCryptoList[0] && newCryptoList[0]["trust_score_rank"]}
          </h5>
          <h5>
            Trust score: {newCryptoList[0] && newCryptoList[0]["trust_score"]}
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
