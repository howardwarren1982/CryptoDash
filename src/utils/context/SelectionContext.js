import React from "react"
import { useContext, useState } from "react"
import { UserProvider } from "./UserContext"

const SelectionContext = React.createContext()
const UpdateSelection = React.createContext()

export function useSelectionContext() {
  return useContext(SelectionContext)
}

export function useSelectionUpdateContext() {
  return useContext(UpdateSelection)
}

export function SelectionProvider({ children }) {
  const [selection, setSelection] = useState("")

  function updateSelection(newSelection) {
    setSelection(newSelection)
  }

  return (
    <UserProvider>
      <SelectionContext.Provider value={selection}>
        <UpdateSelection.Provider value={updateSelection}>
          {children}
        </UpdateSelection.Provider>
      </SelectionContext.Provider>
    </UserProvider>
  )
}
