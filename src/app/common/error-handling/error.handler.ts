import { ErrorHandler, Injectable, NgZone, Provider } from "@angular/core"
import {
  ErrorsRouterService,
  RedirectionGuardError
} from "src/app/pages/errors/error-router.service"

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorsRouter: ErrorsRouterService) {}
  handleError(error: any): void {
    // ignore only expected errors
    if (this.isRedirectionError(error)) {
      return
    }
    if (this.isServerUnavailableError(error)) {
      return this.errorsRouter.redirectToUnavailable()
    }

    console.error(error)
  }

  private isRedirectionError(error: any): boolean {
    const result = error.rejection instanceof RedirectionGuardError
    return result
  }

  private isServerUnavailableError(error: any): boolean {
    const result = error?.networkError?.status === 0 || error?.rejection?.networkError?.status === 0
    return result
  }
}

export const GlobalErrorHandlerProvider: Provider = {
  provide: ErrorHandler,
  useExisting: GlobalErrorHandler
}
