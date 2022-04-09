import { ErrorHandler, Injectable, NgZone, Provider } from "@angular/core"
import { ErrorsRouterService } from "../error-router.service"

@Injectable({
  providedIn: "root"
})
export class ServerUnavailableErrorHandler implements ErrorHandler {
  constructor(private errorRouter: ErrorsRouterService, private ngZone: NgZone) {}
  handleError(error: any): void {
    const isExpectedError =
      error?.networkError?.status === 0 || error?.rejection?.networkError?.status === 0
    if (isExpectedError) {
      console.log("Server unavailable!")
      this.ngZone.run(() => this.errorRouter.redirectToUnavailable())
      return
    }

    throw error
  }
}

export const ServerUnavailableErrorHandlerProvider: Provider = {
  provide: ErrorHandler,
  useClass: ServerUnavailableErrorHandler
}
