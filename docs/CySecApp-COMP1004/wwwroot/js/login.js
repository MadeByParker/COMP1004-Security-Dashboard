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
const db =  firebase.firestore()
var uid;

//create elements and render table

function ManagePage() {
  renderPage("Manage");
  document.getElementById("header").innerHTML = "System Management";
}

function LoginPage() {
  document.getElementById("header").innerHTML = "Sign In";
  renderPage("app");
}

function createTable(doc){
  const table = document.getElementById("login-body");
  const tr = document.createElement("tr"); // Create a new table row
  const email = document.createElement("td"); // Create the element that the size is going to be in
  const username = document.createElement("td"); // Repeate for each element
  const password = document.createElement("td");
  const deleteBtn = document.createElement("i"); // Create the delete icon
  deleteBtn.innerHTML = '<i class="far fa-minus-square fa-2x"></i>'

  email.textContent = doc.data().email;
  username.textContent = doc.data().name;
  password.textContent = doc.data().password;

  tr.appendChild(email);
  tr.appendChild(username);
  tr.appendChild(password);
  tr.appendChild(deleteBtn);

  table.appendChild(tr);

    // deleting data
    deleteBtn.addEventListener('click', (e) => {
      var answer = window.confirm("Are you sure you want to delete this login?");
      if (answer) {
      db.collection('users').doc(doc.id).delete()
        .then(function (){
          console.log('Login deleted ID:', doc.id);
          renderPage("Manage");
        })
        .catch((error) => {
          console.log("Unable to delete login", error);
        })
      }
        else {
            return;
        }
  });

}

document.addEventListener("DOMContentLoaded", function () {
  registerLinks();
  renderPage("app")
  let id = window.localStorage.getItem("uid"); // Get a uid stored locally
  console.log(id);
  if (id) uid = id; // If we have the uid, set it
});

function registerLinks() {
  const links = document.querySelectorAll("a"); // Get all 'a' elements that are in the nav
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent a page reload on click
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
    { html, pageTitle: "Security Dashboard" },
    "Security Dashboard",
    pageSlug
  ); // Push the new page into the window's history, this will allow the user to go back
  document.getElementById("page-content-wrapper").innerHTML = html;
  if (pageSlug == "Manage") {
    setupBookings(); // Load the view bookings page logic
  }
}

function setupBookings() {
  db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
      createTable(doc);
    })
  })
}


// Handler for going back
window.onpopstate = function (e) {
  if (e.state) {
    document.getElementById("page-content-wrapper").innerHTML = e.state.html;
    document.title = e.state.pageTitle;
  }
};

function handleLogin(e) {
  const login = document.getElementById("email-login").value;
  const pass = document.getElementById("pass-login").value;
  console.log({ login, pass });
  firebase
    .auth() // Inialise firebase auth
    .signInWithEmailAndPassword(login, pass) // Sign in with given username and password
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user; // get the user from the returned object
      console.log(user);
      uid = user.uid; // get the user id
      renderPage("homePanel");
      saveUid(uid); // save the user id
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert("Password is incorrect!")
    });
}

function handleSignUp(e) {
  const login = document.getElementById("email-signup").value;
  const name = document.getElementById("name-signup").value;
  const pass = document.getElementById("PassSignUp").value;
  const confPass = document.getElementById("confPass").value;
  if (pass !== confPass) {
    alert("Passwords do not match!");
    return;
  }

  if(pass == confPass && pass.length < 6){
    alert("Password should be at least 6 characters!");
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
      renderPage("Manage");
      
      db.collection("users").add({
        email: login,
        id: uid,
        name: name,
        password: pass
    })
    .then((user) => {
        console.log("Document written with ID: ", user.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((user) => {
          console.log(`${user.id} => ${user.data()}`);
      });
  });
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    if(errorMessage == "The email address is already in use by another account."){
      alert("Email is in use");
    }
  });
}

function addLogin(e) {
  const login = document.getElementById("email-signup").value;
  const name = document.getElementById("name-signup").value;
  const pass = document.getElementById("PassSignUp").value;
  const confPass = document.getElementById("confPass").value;
  if (pass !== confPass) {
    alert("Passwords do not match!");
    return;
  }

  if(pass == confPass && pass.length < 6){
    alert("Password should be at least 6 characters!");
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
      renderPage("Manage");
      db.collection("users").add({
        email: login,
        id: uid,
        name: name,
        password: pass
    })
    .then((user) => {
        console.log("Document written with ID: ", user.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((user) => {
          console.log(`${user.id} => ${user.data()}`);
      });
  });
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
}


function saveUid(id) {
  window.localStorage.setItem("uid", id);
}

