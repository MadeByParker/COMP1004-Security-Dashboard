$(document).ready()(function () {
  //clock
  function updateClock() {
    var today = new Date();
    document.getElementById("dTime").innerHTML = today.toLocaleString();
    setTimeout(updateClock, 1000);
  }
  updateClock();

  $(".dropdown").hover(function(){
    var dropdownMenu = $(this).children(".dropdown-menu");
    if(dropdownMenu.is(":visible")){
        dropdownMenu.parent().toggleClass("open");
    }
});
});



//switch pages


function HomeLogin() {
  $("#page-content-wrapper").load("homePanel.html");
  document.getElementById("header").innerHTML = "Home";
}

function HomePage() {
  $("#page-content-wrapper").load("homePanel.html");
  document.getElementById("header").innerHTML = "Home";
}

function OverviewPage() {
  $("#page-content-wrapper").load("Overview.html");
  document.getElementById("header").innerHTML = "Security Dashboard Home";
}
function StatusesPage() {
  $("#page-content-wrapper").load("Status.html");
  document.getElementById("header").innerHTML =
    "Network and System Log Statuses";
}

function IssuesPage() {
  $("#page-content-wrapper").load("Issues.html");
  document.getElementById("header").innerHTML = "Current Problems";
}

function AlertsPage() {
  $("#page-content-wrapper").load("alerts.html");
  document.getElementById("header").innerHTML = "Security Alerts";
}

function UserPage() {
  $("#page-content-wrapper").load("Users.html");
  document.getElementById("header").innerHTML = "List of Users";
}

function InfoPage() {
  $("#page-content-wrapper").load("Info.html");
  document.getElementById("header").innerHTML = "About Us";
}

function IPPage() {
  $("#page-content-wrapper").load("IP.html");
  document.getElementById("header").innerHTML = "Connections of IPs";
}

function MalwarePage() {
  $("#page-content-wrapper").load("malware.html");
  document.getElementById("header").innerHTML = "Malware Centre";
}

function weekhours() {
  $("#page-content-wrapper").load("UsersLWeek.html");
  document.getElementById("header").innerHTML = "Last Week";
}

function monthhours() {
  $("#page-content-wrapper").load("UserMonth.html");
  document.getElementById("header").innerHTML = "Last Month";
}

