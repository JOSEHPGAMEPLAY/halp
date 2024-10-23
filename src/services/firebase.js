
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZlH5jGBAkvB_p2FuCGfh8Sd6le9PPvrE",
  authDomain: "laperla-d8f8d.firebaseapp.com",
  projectId: "laperla-d8f8d",
  storageBucket: "laperla-d8f8d.appspot.com",
  messagingSenderId: "423380074842",
  appId: "1:423380074842:web:51341a034b21a36decf363"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, collection, addDoc,storage };