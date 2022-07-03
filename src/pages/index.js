import * as React from "react"
import Layout from "../components/layout"
import SignUp from "../components/signup.component/SignUp"
import Login from "../components/loginRegister.component/login"
import app from "gatsby-plugin-firebase-v9.0"
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"

import DashBoard from "./dashBoard"

const IndexPage = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  )
}
export default IndexPage

// to get date from the database
// const [value, loading, error] = useCollectionData(
//   collection(getFirestore(app), "users")
// )
// console.log(value)
