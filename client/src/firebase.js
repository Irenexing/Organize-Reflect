import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA610NZ_G2SfIo357tLfAklHAsOCJVc0ek",
  authDomain: "organize-and-reflect.firebaseapp.com",
  projectId: "organize-and-reflect",
  storageBucket: "organize-and-reflect.appspot.com",
  messagingSenderId: "949345017969",
  appId: "1:949345017969:web:1f9348f466401346383bd0",
  measurementId: "G-CW06JHH3D3"
};

const app = initializeApp(firebaseConfig);
const db =getFirestore(app);

export { db };