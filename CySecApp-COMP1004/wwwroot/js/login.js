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

var uid;

//google firebase firestore's database access
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
  registerLinks();
  renderPage("homePanel"); // Direct to home page on load
  let id = window.localStorage.getItem("uid"); // Get a uid stored locally
  console.log(id);
  if (id) uid = id; // If we have the uid, set it
});

function registerLinks() {
  const links = document.querySelectorAll("a"); // Get all 'a' elements that are in the nav
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent a page reload on click
      renderPage(link.id); // Render the page with the link's id (i.e. "log-in")
    });
  });
}

async function renderPage(pageSlug) {
  const page = await fetch(pageSlug + ".html"); // Fetch the corresponding html page for the page ("log-in" will get log-in.html)
  let html = await page.text(); // Get the text from the response
  if (page.status === 404) {
    // 404 - couldn't find the page
    html = "<h1>404 Page not found</h1>";
  }
  window.history.pushState(
    { html, pageTitle: "PALS Cafe" },
    "PALS Cafe",
    pageSlug
  ); // Push the new page into the window's history, this will allow the user to go back
  document.getElementById("page-content-wrapper").innerHTML = html;
}

// Handler for going back
window.onpopstate = function (e) {
  if (e.state) {
    document.getElementById("app").innerHTML = e.state.html;
    document.title = e.state.pageTitle;
  }
};


function handleLogin(e){
  const login = document.getElementById("email-login").value;
  const pass = document.getElementById("pass-login").value;
  console.log({login, pass});
  firebase.auth().signInWithEmailAndPassword(login, pass)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    uid = user.uid;
    renderPage("homePanel");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function handleSignUp(e){
  const login = document.getElementById("email-signup").value;
  const name = document.getElementById("name-signup").value;
  const pass = document.getElementById("PassSignUp").value;
  const confPass = document.getElementById("confPass").value;
  if (pass !== confPass) {
    alert("Passwords do not match!");
    return;
  }
  console.log({ login, pass, confPass, name });
  firebase
    .auth()
    .createUserWithEmailAndPassword(login, pass) // Sign up with email nad password
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      uid = user.uid; // Get the user id
      console.log(uid);
      renderPage("homePanel"); // Go to the overview page
      db.collection("users")
        .add({
          email: login,
          id: uid,
          name: name,
        })
        .then((user) => {
          console.log(user.id);
        })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

