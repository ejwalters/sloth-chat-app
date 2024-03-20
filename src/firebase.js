// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnZKBR_wSobTpFCTG-xxrcxAdMoV7tXo4",
    authDomain: "sloth-chat-app.firebaseapp.com",
    projectId: "sloth-chat-app",
    storageBucket: "sloth-chat-app.appspot.com",
    messagingSenderId: "56409453227",
    appId: "1:56409453227:web:31f41c4139c1bbfc8f7dee",
    measurementId: "G-52G0WNVQCS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };