import { storeTokens } from "./main";

window.onload = async () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [
    fragment.get("access_token"),
    fragment.get("token_type"),
  ];

  if (accessToken && tokenType) {
    storeTokens(tokenType, accessToken);
  }

  window.location.replace("/");
};
