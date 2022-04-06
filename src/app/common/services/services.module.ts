import { NgModule, Provider } from "@angular/core"
import { AppAuthorizationModule } from "src/app/features/authorization/authorization.module"
import { AuthorizationService } from "src/app/features/authorization/authorization.service"
import { CommonImagesService } from "./images.service"
import { AppRouterService } from "./router.service"

const services: Provider[] = [AuthorizationService, AppRouterService, CommonImagesService]

@NgModule({
  imports: [AppAuthorizationModule],
  providers: services
})
export class AppCommonServicesModule {}
