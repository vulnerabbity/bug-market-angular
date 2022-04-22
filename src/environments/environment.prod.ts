import { AppEnvironment } from "./environment.interface"

const backendUrl = "https://bug-market-nest.herokuapp.com"
const websocketsUrl = backendUrl

export const environment: AppEnvironment = {
  production: false,
  publicFilesUrl: "https://bug-market-nest.herokuapp.com/public-files",
  backendUrl,
  hostsForTokenUsage: [backendUrl],
  websocketsUrl
}
