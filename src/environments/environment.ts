import { AppEnvironment } from "./environment.interface"

export const environment: AppEnvironment = {
  production: false,
  graphqlBackendUrl: "http://localhost:3000/graphql",
  publicFilesUrl: "http://localhost:3000/public-files",
  hostsForTokenUsage: ["http://localhost:3000"]
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
