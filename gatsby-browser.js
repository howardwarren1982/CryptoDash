import React from "react"
import { SelectionProvider } from "./src/utils/context/SelectionContext"

export const wrapRootElement = ({ element }) => {
  return <SelectionProvider>{element}</SelectionProvider>
}
