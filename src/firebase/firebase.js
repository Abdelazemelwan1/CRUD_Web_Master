
import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyAGjRQXo4v5acxm1wscGCZ4fKh3z_qXWHQ",
  authDomain: "crudoperation-9df14.firebaseapp.com",
  projectId: "crudoperation-9df14",
  storageBucket: "crudoperation-9df14.firebasestorage.app",
  messagingSenderId: "1084024476144",
  appId: "1:1084024476144:web:9b4773812a86c6db790d35",
  measurementId: "G-M1D1HF4C4N"
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID
//   measurementId: "G-M1D1HF4C4N"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

// export default auth 