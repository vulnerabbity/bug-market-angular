import { ErrorHandler, Injectable, Provider } from "@angular/core"
import { RedirectionGuardError } from "./error-router.service"

@Injectable()
export class RedirectGuardErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error.rejection) {
      const expectedError = error.rejection instanceof RedirectionGuardError
      if (expectedError) {
        return
      }
    }
    throw error
  }
}

export const RedirectGuardErrorHandlerProvider: Provider = {
  provide: ErrorHandler,
  useClass: RedirectGuardErrorHandler
}
