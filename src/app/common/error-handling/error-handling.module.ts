import { NgModule } from "@angular/core"
import { GlobalErrorHandlerProvider } from "./error.handler"

@NgModule({
  providers: [GlobalErrorHandlerProvider]
})
export class AppErrorHandlingModule {}
