import { NgModule } from "@angular/core"
import { RedirectGuardErrorHandlerProvider } from "src/app/pages/errors/redirect.error-handler"
import { ServerUnavailableErrorHandlerProvider } from "src/app/pages/errors/server-unavailable/server-unavailable.handler"

@NgModule({
  providers: [RedirectGuardErrorHandlerProvider, ServerUnavailableErrorHandlerProvider]
})
export class AppErrorHandlingModule {}
