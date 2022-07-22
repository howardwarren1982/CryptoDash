import { setDoc, doc } from "firebase/firestore"

function useFirebaseFunctions(db, collectiongName, docName) {
  function addToFirestore(data) {
    setDoc(doc(db, collectiongName, docName), data)
  }

  return addToFirestore
}

export default useFirebaseFunctions
