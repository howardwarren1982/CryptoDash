import React from "react"
import "./exchangeCardStyle.scss"

const ExchangeCard = ({ title, picture }) => {
  return (
    <div className="exchange-card">
      {" "}
      <div className="title">{title}</div>
      <div className="img-side">
        {" "}
        <img src={picture} alt="info card" />{" "}
      </div>{" "}
    </div>
  )
}

export default ExchangeCard
