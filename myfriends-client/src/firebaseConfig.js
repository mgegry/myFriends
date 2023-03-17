import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAu69M1LlmqQfMkCfTp4vRn2IKt0xjS5t4",
  authDomain: "myfriends-5939e.firebaseapp.com",
  projectId: "myfriends-5939e",
  storageBucket: "myfriends-5939e.appspot.com",
  messagingSenderId: "776817568027",
  appId: "1:776817568027:web:a7b00ee3e0456f9aa80bbe",
  measurementId: "G-1JG435YK3J",
});
// Firebase storage reference
const storage = getStorage(app);
export default storage;
