import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: **",
  databaseURL: "**",
  projectId: "tfg-ivan-almeida",
  storageBucket: "**",
  messagingSenderId: "**",
  appId: ""
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth()
  const db = firebase.firestore();
  const storage = firebase.storage();
  export{auth,firebase,db,storage}
