import { AppEnvironment } from "./environment.interface"

const backendUrl = "http://localhost:3000"

export const environment: AppEnvironment = {
  production: false,
  publicFilesUrl: "http://localhost:3000/public-files",
  backendUrl,
  hostsForTokenUsage: [backendUrl]
}
