import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoGkUYA2WILIe93ya3NIMXMph4c_L0_Pw",
  authDomain: "topeats-3fc9a.firebaseapp.com",
  projectId: "topeats-3fc9a",
  storageBucket: "topeats-3fc9a.appspot.com",
  messagingSenderId: "277783532236",
  appId: "1:277783532236:web:58f6427113fb622c0f2869",
  measurementId: "G-HC3WHFR97T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
