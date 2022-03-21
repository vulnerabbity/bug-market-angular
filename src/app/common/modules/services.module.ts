import { NgModule, Provider } from "@angular/core"
import { FilesService } from "../services/files.service"

const services: Provider[] = [FilesService]

@NgModule({
  providers: services
})
export class AppCommonServicesModule {}
