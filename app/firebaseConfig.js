import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAFTlCIP94E-QPGpDQNXSQqBVysrZ7yxIM",
  authDomain: "connect360auth.firebaseapp.com",
  projectId: "connect360auth",
  storageBucket: "connect360auth.firebasestorage.app",
  messagingSenderId: "838845322147",
  appId: "1:838845322147:web:e14341bfb9d54e835e0016",
  measurementId: "G-BY0Q8CJMH0"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export{auth,db}