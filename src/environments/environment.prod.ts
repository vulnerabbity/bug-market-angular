import { AppEnvironment } from "./environment.interface"

export const environment: AppEnvironment = {
  production: true,
  graphqlBackendUrl: "http://localhost:3000/graphql",
  publicFilesUrl: "http://localhost:3000/public-files"
}
