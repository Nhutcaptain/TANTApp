// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApiKQu2i4jzid7Xaw965D_3ZIpyjvHYZI",
  authDomain: "quizapp-442a6.firebaseapp.com",
  projectId: "quizapp-442a6",
  storageBucket: "quizapp-442a6.appspot.com",
  messagingSenderId: "225301072332",
  appId: "1:225301072332:web:0620a2d111c0808814f569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export  {db,app, storage};