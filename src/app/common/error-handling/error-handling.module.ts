import { NgModule } from "@angular/core"
import { RedirectGuardErrorHandlerProvider } from "src/app/pages/errors/redirect.error-handler"

@NgModule({
  providers: [RedirectGuardErrorHandlerProvider]
})
export class AppErrorHandlingModule {}
