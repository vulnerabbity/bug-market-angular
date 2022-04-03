import { NgModule, Provider } from "@angular/core"
import { AppAuthorizationModule } from "src/app/features/authorization/authorization.module"
import { AuthorizationService } from "src/app/features/authorization/authorization.service"
import { FilesService } from "./files.service"

const services: Provider[] = [FilesService, AuthorizationService]

@NgModule({
  imports: [AppAuthorizationModule],
  providers: services
})
export class AppCommonServicesModule {}
