import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import { collection, getDocs, getFirestore } from "firebase/firestore"; 
import { ItemType } from "../Pages/Home/Home";

const firebaseConfig = {
  apiKey: "AIzaSyCNZpwKQkWqyvg9TI73Woj9QhuDSUCcWIQ",
  authDomain: "auth-b6721.firebaseapp.com",
  projectId: "auth-b6721",
  storageBucket: "auth-b6721.firebasestorage.com",
  messagingSenderId: "317994117278",
  appId: "1:317994117278:web:39a75145cef0177f6db38f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

const fetchFromFirestore = async (): Promise<ItemType[]> => {
  try {
    const productsCollection = collection(firestore, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ItemType[]; 
    console.log("Fetched products from Firestore:", productList);
    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};


export {
  auth,
  provider,
  storage,
  firestore,
  fetchFromFirestore
}