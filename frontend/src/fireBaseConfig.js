import firebase from 'firebase/compat/app'; // note the "/compat"
import 'firebase/compat/auth'; 
const firebaseConfig = {
  apiKey: "AIzaSyDHp6kO8THL-FBY9A7044bFA16BI_eji2U",
  authDomain: "chat-app-5d5fe.firebaseapp.com",
  projectId: "chat-app-5d5fe",
  messagingSenderId: "264529411536",
  appId: "1:264529411536:web:85ecc54443f718fb5d4dd5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
