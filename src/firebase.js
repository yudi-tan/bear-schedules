import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAr6ABsEFegsSDQZqxZmeTH_0JVAz5Omhs",
    authDomain: "bear-schedules.firebaseapp.com",
    databaseURL: "https://bear-schedules.firebaseio.com",
    projectId: "bear-schedules",
    storageBucket: "",
    messagingSenderId: "393933232888"
  };
  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;
