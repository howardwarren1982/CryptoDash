import React from "react"
import "./sideBarStyle.scss"
import { useState, useEffect } from "react"
import useFetch from "../../utils/hooks/useFetch"
import { useSelectionUpdateContext } from "../../utils/context/SelectionContext"
import { useAuthState } from "react-firebase-hooks/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { getAuth } from "firebase/auth"
import ExchangeCard from "../exchangeCards.component/ExchangeCard"

function SideBar() {
  const auth = getAuth(app)
  const setSelection = useSelectionUpdateContext()
  let [searchresult, setSearchResult] = useState("")
  const [user] = useAuthState(auth)
  const [exchangeListData] = useFetch(
    "https://api.coingecko.com/api/v3/exchanges"
  )

  const onchange = e => {
    setSearchResult(e.target.value)
  }

  let filtedCryptoCoinList = exchangeListData?.filter(cryptoCoin =>
    cryptoCoin.name.toLowerCase().includes(searchresult.toLowerCase())
  )

  return (
    <div className="side-bar">
      <div className="user-email">{user?.email}</div>
      <input
        className="search-bar"
        type="text"
        placeholder="search"
        onChange={onchange}
      />
      <div className="exchange-list">
        {filtedCryptoCoinList?.map(coin => (
          <div key={coin.id} className="coin-list-item">
            <div
              onClick={e => setSelection(e.target.id)}
              id={coin.id}
              className="clickable-cover"
            ></div>
            <ExchangeCard picture={coin.image} title={coin.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
