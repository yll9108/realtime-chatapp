import firebase from "firebase/compat/app"; // note the "/compat"
import "firebase/compat/auth";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    messagingSenderId:
        process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
