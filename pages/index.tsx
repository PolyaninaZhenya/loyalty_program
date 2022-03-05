import type { NextPage } from 'next'
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import {useAuth} from "../src/context/auth";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  )
}

export default Home
