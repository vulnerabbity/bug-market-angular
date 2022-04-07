import { AppEnvironment } from "./environment.interface"

const backendUrl = "https://bug-market-nest.herokuapp.com"

export const environment: AppEnvironment = {
  production: false,
  publicFilesUrl: "https://bug-market-nest.herokuapp.com/public-files",
  backendUrl,
  hostsForTokenUsage: [backendUrl]
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
