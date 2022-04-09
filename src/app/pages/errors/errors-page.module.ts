import { NgModule } from "@angular/core"
import { ErrorsRouterService } from "./error-router.service"
import { ErrorsRoutingModule } from "./errors-routing.module"

@NgModule({
  imports: [ErrorsRoutingModule],
  providers: [ErrorsRouterService]
})
export class ErrorsPageModule {}
