import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAAm9fpxxNx3_4H__y59ZzDv3Rvv3I0ugw",
    authDomain: "fir-project-c7350.firebaseapp.com",
    databaseURL: "https://fir-project-c7350.firebaseio.com",
    projectId: "fir-project-c7350",
    storageBucket: "fir-project-c7350.appspot.com",
    messagingSenderId: "377628618104",
    appId: "1:377628618104:web:950b83fb5b5fae9b812c8d"
  };
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

//   export default fireDB.database().ref();
export default fireDB
// export default firebaseConfig