import { Guild } from "./guild";

const oauthUrl = process.env.OAUTH_URL;

// Page elements
const guildsDisplay = document.querySelector("#guilds-display");
const authBtn = document.querySelector('#auth-btn');

// If true, then enable guilds display and disable auth
function toggleAuthUI(enable: boolean) {
  if (enable) {
    authBtn?.classList.add("hidden");
    guildsDisplay?.classList.remove("hidden");
  }
  else {
    authBtn?.classList.remove("hidden");
    guildsDisplay?.classList.add("hidden");
  }
}

window.onload = () => {

  authBtn?.setAttribute("href", oauthUrl!);

  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

  if (accessToken) {
    toggleAuthUI(true);
  }

  fetch("https://discord.com/api/v9/users/@me/guilds", {
    method: "GET",
    headers: {
      "Authorization": `${tokenType} ${accessToken}`
    }
  }).then(res => {
    res.json().then(json => {
      const guilds: Guild[] = json;
      if (guildsDisplay) guildsDisplay.innerHTML = `${guilds.length}`;
    })
  });
};

