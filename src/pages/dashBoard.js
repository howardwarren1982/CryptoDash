import React, { useEffect } from "react"
import { useSelectionUpdateContext } from "../utils/context/SelectionContext"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signOut } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { navigate } from "gatsby"
import UserOnlyContent from "../components/UserOnlyContent"
import SideBar from "../components/sidebar.component/SideBar"
import LineChart from "../components/chart.component/LineChart"
import FollowDisplay from "../components/followDisplay.component/FollowDisplay"
import ExtchangeInfo from "../components/exchangeInfoDisplay.component/ExtchangeInfo"
import "./dashBoardStyle.scss"
import ResponsiveSideBar from "../components/responsiveSideBar.component/ResponsiveSideBar"
import DropDown from "../components/dropDown.component/DropDown"

const DashBoard = () => {
  const setSelection = useSelectionUpdateContext()
  useEffect(() => {
    setSelection("binance")
  }, [])

  const auth = getAuth(app)
  const logout = async e => {
    e.preventDefault()
    try {
      await signOut(auth)
      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }
  const [user, loading, error] = useAuthState(auth)
  return (
    <div>
      <UserOnlyContent
        message={"no data found"}
        routeTologin={"yes"}
        authUser={user}
      >
        <div className="main-section">
          <div className="side-bar">
            <div className="side_bar">
              {" "}
              <SideBar />
            </div>

            <div className="resposive_sideBar">
              <ResponsiveSideBar>
                <SideBar />
              </ResponsiveSideBar>
            </div>
          </div>
          <div className="main-area">
            <nav>
              <div className="Dash-heading"> HOWARD'S CRYPTO DASH </div>
              <button className="signin-btn" onClick={logout}>
                Log out
              </button>
              <div className="resposive_following">
                <DropDown />
              </div>{" "}
            </nav>

            <div className="chartarea">
              <LineChart />
              <div className="following_box">
                <FollowDisplay />
              </div>
            </div>
            <ExtchangeInfo />
          </div>
        </div>
      </UserOnlyContent>
    </div>
  )
}

export default DashBoard
