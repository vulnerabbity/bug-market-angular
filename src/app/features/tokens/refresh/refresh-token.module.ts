import { NgModule } from "@angular/core"
import { AccessTokenRefresherService } from "./access-token-refresher.service"

@NgModule({
  providers: [AccessTokenRefresherService]
})
export class RefreshTokensModule {}
