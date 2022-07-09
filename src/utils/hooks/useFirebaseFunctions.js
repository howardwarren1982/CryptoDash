import { setDoc, doc } from "firebase/firestore"

function useFirebaseFunctions(db, collectiongName, docName, data) {
  function addToFirestore() {
    setDoc(doc(db, collectiongName, docName), data)
  }

  return addToFirestore
}

export default useFirebaseFunctions
