import React from "react"
import { SelectionProvider } from "./src/utils/context/SelectionContext"
import Layout from "./src/components/layout"

export const wrapRootElement = ({ element }) => {
  return (
    <SelectionProvider>
      {" "}
      <Layout>{element}</Layout>{" "}
    </SelectionProvider>
  )
}
