import type { NextPage } from 'next'
import {useAuthState} from "react-firebase-hooks/auth";
import {app} from "../firebase/clientApp";
import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const Home: NextPage = () => {

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const db = getFirestore()

  try {
    const querySnapshot = async () => {
      return await getDocs(collection(db, "providers"))
    };

    querySnapshot().then(result => {
      result.forEach((item) => {
        console.log(item.data())
      })
    })

  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return (
    <>
      Hello
    </>
  )
}

export default Home
