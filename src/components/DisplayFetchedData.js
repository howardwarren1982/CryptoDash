import React from "react"

function DisplayFetchedData({
  value,
  children,
  loading,
  loadingHTML,
  error,
  errorHTML,
}) {
  return (
    <>
      {" "}
      {error && errorHTML}
      {loading && loadingHTML}
      {value && children}
    </>
  )
}

export default DisplayFetchedData
