import React from "react"
import { cryptoCoinList } from "../../data/appData"
import "./sideBarStyle.scss"
import { useState } from "react"
import { useSelectionUpdateContext } from "../../utils/context/SelectionContext"
import { useAuthState } from "react-firebase-hooks/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { getAuth } from "firebase/auth"

function SideBar() {
  const auth = getAuth(app)
  const setSelection = useSelectionUpdateContext()
  let [searchresult, setSearchResult] = useState("")
  const [user, loading, error] = useAuthState(auth)

  const onchange = e => {
    setSearchResult(e.target.value)
  }

  let filtedCryptoCoinList = cryptoCoinList.filter(cryptoCoin =>
    cryptoCoin.name.toLowerCase().includes(searchresult.toLowerCase())
  )

  return (
    <div className="side-bar">
      {user?.email}
      {console.log(user?.uid)}
      <input
        className="search-bar"
        type="text"
        placeholder="search"
        onChange={onchange}
      />
      <div className="exchange-list">
        {filtedCryptoCoinList.map(coin => (
          <div
            className="coin-list-item"
            onClick={e => setSelection(e.target.id)}
            key={coin.id}
            id={coin.id}
          >
            <div className="coin-list-item-name">{coin.name}</div>
            <img src={coin.image} alt="" />
            <div>---------------------------------</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
