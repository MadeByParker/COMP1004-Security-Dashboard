      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyAKZg_PjjCfSdJejcZiIx2D3ANeJPXFZcI",
        authDomain: "security-dashboard-97167.firebaseapp.com",
        projectId: "security-dashboard-97167",
        storageBucket: "security-dashboard-97167.appspot.com",
        messagingSenderId: "109877111062",
        appId: "1:109877111062:web:dbfaa2aecfad0bd6df8837",
        measurementId: "G-4YXC68LGZD"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });