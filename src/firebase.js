import firebase from 'firebase';
import config from './firebaseconfig.js';

  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;
