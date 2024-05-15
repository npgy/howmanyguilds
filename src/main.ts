import { Guild } from "./guild";

const oauthUrl =
  "https://discord.com/oauth2/authorize?client_id=1109280997817729085&response_type=token&redirect_uri=https%3A%2F%2Flocalhost:5173%2Fcallback&scope=guilds";

let loggedIn: boolean = false;

// Page elements
const guildsDisplay = document.querySelector("#guilds-display");
// const guildsError = document.querySelector("#guilds-error");
const authBtn = document.querySelector("#auth-btn");
const logoutBtn = document.querySelector("#logout-btn");
logoutBtn?.children.namedItem("btn")?.addEventListener("click", () => logout());

// If true, then enable guilds display and disable auth
function updateUI(enable: boolean) {
  if (enable) {
    authBtn?.classList.add("hidden");
    logoutBtn?.classList.remove("hidden");
    guildsDisplay?.classList.remove("hidden");
  } else {
    authBtn?.classList.remove("hidden");
    logoutBtn?.classList.add("hidden");
    guildsDisplay?.classList.add("hidden");
  }
}

export const storeTokens = (tokenType: string, token: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("token_type", tokenType);
};

const storeGuildCount = (count: number) => {
  localStorage.setItem("last_guild_count", String(count));
};

const getLastGuildCount = (): number => {
  return Number(localStorage.getItem("last_guild_count"));
};

const login = () => {
  loggedIn = true;
  updateUI(true);
};

const logout = () => {
  localStorage.clear();
  loggedIn = false;
  updateUI(false);
};

function getToken(): string[] {
  return [
    localStorage.getItem("token_type") ?? "",
    localStorage.getItem("token") ?? "",
  ];
}

function updateGuildDisplay(guildCount: number) {
  guildsDisplay!.innerHTML = `${guildCount}`;
}

async function getGuildCount(tokenType: string, accessToken: string) {
  const res = await fetch("https://discord.com/api/v9/users/@me/guilds", {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  });

  const guilds: Guild[] = await res.json();

  if (res.status === 200) {
    const guildCount = guilds.length;
    updateGuildDisplay(guildCount);
    storeGuildCount(guildCount);
  }
  // else {
  //   guildsError?.classList.remove("hidden");
  // }
}

window.onload = async () => {
  authBtn?.setAttribute("href", oauthUrl!);

  const [tokenType, accessToken] = getToken();

  const lastGuildCount = getLastGuildCount();

  if (lastGuildCount > 0) {
    updateGuildDisplay(lastGuildCount);
  }

  if (tokenType !== "" && accessToken !== "") {
    login();
  }

  if (loggedIn) {
    await getGuildCount(tokenType, accessToken);
  }
};
