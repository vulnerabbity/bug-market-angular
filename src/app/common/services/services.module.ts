import { NgModule, Provider } from "@angular/core"
import { AppAuthorizationModule } from "src/app/features/authorization/authorization.module"
import { AuthorizationService } from "src/app/features/authorization/authorization.service"
import { AppRouterService } from "./router.service"

const services: Provider[] = [AuthorizationService, AppRouterService]

@NgModule({
  imports: [AppAuthorizationModule],
  providers: services
})
export class AppCommonServicesModule {}
