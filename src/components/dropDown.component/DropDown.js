import React from "react"
import FollowDisplay from "../followDisplay.component/FollowDisplay"
import "./dropDownStyle.scss"

const DropDown = ({ children }) => {
  return (
    <div className="drop_down">
      <nav role="navigation" class="primary-navigation">
        <ul>
          <li>
            <a href="#" className="signin-btn">
              {" "}
              Following{" "}
            </a>
            <ul className="dropdown">
              <li>
                <FollowDisplay />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default DropDown
