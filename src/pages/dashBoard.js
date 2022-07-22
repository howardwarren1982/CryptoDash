import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signOut } from "firebase/auth"
import app from "gatsby-plugin-firebase-v9.0"
import { navigate } from "gatsby"
import UserOnlyContent from "../components/UserOnlyContent"
import SideBar from "../components/sidebar.component/SideBar"
import LineChart from "../components/chart.component/LineChart"
import FollowBtn from "../components/followbtn.component/FollowBtn"
import UnfollowBtn from "../components/unfollowbtn.component/UnfollowBtn"
import FollowDisplay from "../components/followDisplay.component/FollowDisplay"
import ExtchangeInfo from "../components/exchangeInfoDisplay.component/ExtchangeInfo"

const DashBoard = () => {
  const auth = getAuth(app)
  const logout = () => {
    signOut(auth)
    {
      navigate("/")
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
        <nav>
          Nave Bar--------------- <button onClick={logout}>Log out</button>
        </nav>
        <div className="main-section">
          <SideBar />
          <FollowDisplay />
          <div className="chartarea">
            Chart area
            <LineChart />
          </div>
          <FollowBtn>follow</FollowBtn>
          <UnfollowBtn>unfollow</UnfollowBtn>
          <ExtchangeInfo />
        </div>
      </UserOnlyContent>
    </div>
  )
}

export default DashBoard

// if (user) {
//   return (
//     <>
//       <h1>You are not logged in</h1>
//       <Login />
//     </>
//   )
// } else {
//   return (
//     <div>
//       <h1>THIS IS THE DASHBOARD APP!!!!</h1>
//       <button onClick={logout}>Log out</button>
//     </div>
//   )
// }
