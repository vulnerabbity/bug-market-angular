import { NgModule } from "@angular/core"
import { Route, RouterModule } from "@angular/router"
import { ErrorPageUnknown } from "./unknown-error/unknown-error.page"
import { ErrorPageNotFound } from "./not-found/not-found.page"
import { ErrorPageServerUnavailable } from "./server-unavailable/server-unavailable.page"
import { ErrorsRouterService } from "./error-router.service"

export enum ErrorsPaths {
  UnknownError = "unknown-error",
  NotFound = "not-found",
  ServerUnavailable = "server-unavailable"
}

const unknownErrorRoute: Route = {
  path: ErrorsPaths.UnknownError,
  component: ErrorPageUnknown
}

const serverUnavailableRoute: Route = {
  path: ErrorsPaths.ServerUnavailable,
  component: ErrorPageServerUnavailable
}

const notFoundRoute: Route = {
  path: "**",
  component: ErrorPageNotFound
}

const routes: Route[] = [serverUnavailableRoute, unknownErrorRoute, notFoundRoute]

const imports = [RouterModule.forRoot(routes)]

@NgModule({
  imports,
  providers: [],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
