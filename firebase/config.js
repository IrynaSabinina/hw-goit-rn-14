import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGER_ID,
//   appId: process.env.REACT_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyChnr3bTrEp-56uTYdsI5VemH4DA8BgPlw",
  authDomain: "functions-tests-5ba2b.firebaseapp.com",
  databaseURL: "https://functions-tests-5ba2b-default-rtdb.firebaseio.com",
  projectId: "functions-tests-5ba2b",
  storageBucket: "functions-tests-5ba2b.appspot.com",
  messagingSenderId: "453125847842",
  appId: "1:453125847842:web:1a8639b66081f2e4df437b",
  measurementId: "G-1GXPEZ8Y9V",
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
