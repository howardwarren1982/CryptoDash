import React from "react"
import { cryptoCoinList } from "../../data/appData"
import { useSelectionContext } from "../../utils/context/SelectionContext"

function ExtchangeInfo() {
  let selection = useSelectionContext()

  const newCryptoList = cryptoCoinList.filter(item => {
    return item.id === selection
  })

  return (
    <div>
      <div className="left-side">
        <h5>Name: {newCryptoList[0] && newCryptoList[0]["name"]}</h5>
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
  )
}

export default ExtchangeInfo
