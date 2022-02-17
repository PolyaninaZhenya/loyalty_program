import "firebase/auth";
import "firebase/firestore";
import {FirebaseApp, initializeApp} from "firebase/app";

const clientCredentials = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};


const app: FirebaseApp = initializeApp(clientCredentials);

export {app};

