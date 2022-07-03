import React from "react"
import { cryptoCoinList } from "../../data/appData"
import "./sideBarStyle.scss"
import { useState } from "react"

function SideBar() {
  const [serchresult, setSearchResult] = useState()

  const onchange = e => {
    setSearchResult(e.target.value)
  }

  let filtedCryptoCoinList = cryptoCoinList.filter(cryptoCoin =>
    cryptoCoin.name.toLowerCase().includes(serchresult.toLowerCase())
  )

  console.log(serchresult)
  return (
    <div className="side-bar">
      User Email
      <input
        className="search-bar"
        type="text"
        placeholder="search"
        onChange={onchange}
      />
      <div className="exchange-list">
        {filtedCryptoCoinList.map(coin => (
          <div className="coin-list-item" key={coin.id}>
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
