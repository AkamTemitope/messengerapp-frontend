import firebase from "firebase"
              
const firebaseConfig = {
    apiKey: "AIzaSyB5KADJBqTkO_-lpYy2LTo_In_EYY3in3A",
    authDomain: "webchatt-2897f.firebaseapp.com",
    projectId: "webchatt-2897f",
    storageBucket: "webchatt-2897f.appspot.com",
    messagingSenderId: "664611824700",
    appId: "1:664611824700:web:bb6ee4c17b22b91988cf39"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db

