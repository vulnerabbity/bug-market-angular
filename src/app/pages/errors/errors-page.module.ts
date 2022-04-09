import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { ErrorsRouterService } from "./error-router.service"
import { ErrorsRoutingModule } from "./errors-routing.module"
import { ErrorPageNotFound } from "./not-found/not-found.page"
import { ErrorPageServerUnavailable } from "./server-unavailable/server-unavailable.page"
import { ErrorPageUnknown } from "./unknown-error/unknown-error.page"

@NgModule({
  imports: [ErrorsRoutingModule, AppCommonModule],
  providers: [ErrorsRouterService],
  declarations: [ErrorPageNotFound, ErrorPageServerUnavailable, ErrorPageUnknown]
})
export class ErrorsPageModule {}
