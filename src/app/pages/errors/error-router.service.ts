import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { ErrorsPaths } from "./errors-routing.module"

@Injectable({
  providedIn: "root"
})
export class ErrorsRouterService {
  constructor(private ngRouter: Router) {}

  redirectToUnknown() {
    this.redirect(ErrorsPaths.UnknownError)
  }

  redirectToNotFound() {
    this.redirect(ErrorsPaths.NotFound)
  }

  redirectToUnavailable() {
    this.redirect(ErrorsPaths.ServerUnavailable)
  }

  private redirect(route: `${ErrorsPaths}`) {
    this.ngRouter.navigate([route])
  }
}
