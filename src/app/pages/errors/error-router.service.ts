import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { HttpResponse } from "src/app/common/interfaces/responses.interface"
import { ErrorsPaths } from "./errors-routing.module"

export class RedirectionGuardError extends Error {
  constructor() {
    const message = "Error-Redirection-Guard"
    super(message)
  }
}

@Injectable({
  providedIn: "root"
})
export class ErrorsRouterService {
  constructor(private ngRouter: Router) {}

  redirectIfError({ status }: HttpResponse) {
    if (status === "success") {
      return
    }

    if (status === "not-found") {
      this.redirectToNotFound()
    } else {
      this.redirectToUnknown()
    }

    throw new RedirectionGuardError()
  }

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
