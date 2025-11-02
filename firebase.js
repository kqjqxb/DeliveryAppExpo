import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAql9dDwrv8U57wEw2SGBpk6MBm9OZKe6s",
  authDomain: "deliveryappcopy.firebaseapp.com",
  projectId: "deliveryappcopy",
  storageBucket: "deliveryappcopy.appspot.com",
  messagingSenderId: "671521209301",
  appId: "1:671521209301:web:1b556c49d25cf8d79c5b5c"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
