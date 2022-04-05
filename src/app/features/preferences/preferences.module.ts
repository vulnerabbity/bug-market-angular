import { NgModule } from "@angular/core"
import { AppPreferencesConfigService } from "./preferences.service"
import { preferencesStorageServices } from "./storage/storage.declaration"

@NgModule({
  providers: [AppPreferencesConfigService, preferencesStorageServices]
})
export class AppPreferencesConfigModule {}
