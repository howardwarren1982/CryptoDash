import React from "react"
import "./responsiveSideBarStyle.scss"

const ResponsiveSideBar = ({ children }) => {
  return (
    <div>
      <div className="content">
        <input
          type="checkbox"
          className="openSidebarMenu"
          id="openSidebarMenu"
        />
        <label for="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner diagonal part-1"></div>
          <div className="spinner horizontal"></div>
          <div className="spinner diagonal part-2"></div>
        </label>
        <div id="sidebarMenu">{children}</div>
      </div>
    </div>
  )
}

export default ResponsiveSideBar
