import React from "react"
import Link from "gatsby-link"

function UserOnlyContent({ children, routeTologin, message, authUser }) {
  if (!authUser) {
    return (
      <>
        <h1>{message}</h1>
        {routeTologin && <Link to={"../"}>Return</Link>}
      </>
    )
  } else {
    return <div>{children}</div>
  }
}

export default UserOnlyContent
