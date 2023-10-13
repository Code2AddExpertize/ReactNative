// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from '@react-native-firebase/auth'; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore,initializeFirestore,CACHE_SIZE_UNLIMITED } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrUkwxhFSLZJtorehEY6NPPmGWhLK13U8",
  authDomain: "eventapp-reactnative.firebaseapp.com",
  projectId: "eventapp-reactnative",
  storageBucket: "eventapp-reactnative.appspot.com",
  messagingSenderId: "145775107361",
  appId: "1:145775107361:web:b1e9ebda76fc5671157260"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with React Native AsyncStorage persistence
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// const firebase = getFirestore();
const firestore =initializeFirestore(FIREBASE_APP,{
  cacheSizeBytes:CACHE_SIZE_UNLIMITED,
});

export const handleSignOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


