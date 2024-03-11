import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCNqDRex2V2D2DIYhei20Dh3sWmMmVp0ns",
  authDomain: "fir-tutorial-9d4cf.firebaseapp.com",
  projectId: "fir-tutorial-9d4cf",
  storageBucket: "fir-tutorial-9d4cf.appspot.com",
  messagingSenderId: "184899591505",
  appId: "1:184899591505:web:431cfd2a7635ba0e3b8770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)