import { AppEnvironment } from "./environment.interface"

const backendUrl = "https://bug-market-nest.herokuapp.com"
const websocketsUrl = "https://bug-market-nest.herokuapp.com:3003"

export const environment: AppEnvironment = {
  production: false,
  publicFilesUrl: "https://bug-market-nest.herokuapp.com/public-files",
  backendUrl,
  hostsForTokenUsage: [backendUrl],
  websocketsUrl
}
