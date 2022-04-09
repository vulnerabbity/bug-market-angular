import { ErrorHandler, Injectable, NgZone, Provider } from "@angular/core"
import { RedirectionGuardError } from "src/app/pages/errors/error-router.service"

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: any): void {
    // ignore only expected errors
    if (this.isErrorToIgnore(error)) {
      return
    }

    throw error
  }

  private isErrorToIgnore(error: any) {
    return this.isRedirectionError(error) || this.isServerUnavailableError(error)
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
