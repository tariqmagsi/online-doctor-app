import Constants from "expo-constants";

export function getIPv4Address() {
  try {
    const { manifest } = Constants;
    const api =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:3000`)
        : `api.example.com`;
    return api;
  } catch (e) {
    console.log(e);
    return "Network Error";
  }
}
