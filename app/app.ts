import { Guild } from "./guild";

let isAuthenticated: boolean = false;

// Page elements
const guildsDisplay = document.querySelector("#guilds-display");
const authBtn = document.querySelector('#auth-btn');
const logoutBtn = document.querySelector('#logout-btn');

function isAuthed() {
  return isAuthenticated || localStorage.getItem("isAuthed");
}

function clickAuthBtn() {
  isAuthenticated = true;
  authenticate();
}

function authenticate() {
  authBtn?.classList.add("hidden");
  guildsDisplay?.classList.remove("hidden");
  localStorage.setItem("isAuthed", "1");
  logoutBtn?.removeAttribute("disabled");
}

function clickLogoutBtn() {
  logout();
}

function logout() {
  authBtn?.classList.remove("hidden");
  guildsDisplay?.classList.add("hidden");
  logoutBtn?.setAttribute("disabled", "true");
  localStorage.setItem("isAuthed", "0");
  console.log("logout");
}

window.onload = async () => {
  authBtn?.addEventListener("click", function (evt) {clickAuthBtn()});
  logoutBtn?.addEventListener("click", function (evt) {clickLogoutBtn()});
  // const guildsRequest = await fetch("https://discord.com/api/v9/users/@me/guilds", {
  //   method: "GET",
  //   headers: {
  //     "Authorization": ""
  //   }
  // }).then(res => {
  //   res.json().then(json => {
  //     const guilds: Guild[] = json;

      
  //   })
  // });

  if (isAuthed()) {
    authenticate();
  }

  if (guildsDisplay) guildsDisplay.innerHTML = `${34}`;
};

