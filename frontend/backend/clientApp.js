import "firebase/auth";
import "firebase/firestore";
import {FirebaseApp, initializeApp, getApp, getApps} from "firebase/app";
let app

// Настраиваем конфиги Firebase
const FirebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

if (getApps().length) {  //Делаем проверку инициализировано приложение backend или нет
  app = getApp()         // если да то получаем приложение
} else {
  app = initializeApp(FirebaseConfig) // если нет то инициализируем
}

export default app;

