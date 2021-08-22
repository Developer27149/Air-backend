const firebase = require("firebase/app").default;

var firebaseConfig = {
  apiKey: "AIzaSyBdBvAuUY7aLfqfKDSCfMwfPt0qSCBDlb4",
  authDomain: "air---chrome-extension.firebaseapp.com",
  projectId: "air---chrome-extension",
  storageBucket: "air---chrome-extension.appspot.com",
  messagingSenderId: "384814053713",
  appId: "1:384814053713:web:0360bdfb4dcdea206bfb70",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp;
