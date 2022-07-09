import * as React from "react"
import Layout from "../components/layout"
import Login from "../components/loginRegister.component/login"

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
//--------------------------------------------------------
// to get data from the database using UID
// import { getFirestore, doc } from 'firebase/firestore';
// import { useDocument } from 'react-firebase-hooks/firestore';

// const FirestoreDocument = () => {
//   const [value, loading, error] = useDocument(
//     doc(getFirestore(firebaseApp), 'hooks', 'nBShXiRGFAhuiPfBaGpt'),
//     {
//       snapshotListenOptions: { includeMetadataChanges: true },
//     }
//   );
//   return (
//     <div>
//       <p>
//         {error && <strong>Error: {JSON.stringify(error)}</strong>}
//         {loading && <span>Document: Loading...</span>}
//         {value && <span>Document: {JSON.stringify(value.data())}</span>}
//       </p>
//     </div>
//   );
// };

//put data into firestore
// import { getFirestore, doc } from 'firebase/firestore';
