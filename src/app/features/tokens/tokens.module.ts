import { NgModule } from "@angular/core"
import { RefreshTokensModule } from "./refresh/refresh-token.module"
import { TokensService } from "./tokens.service"

@NgModule({
  imports: [RefreshTokensModule],
  providers: [TokensService]
})
export class TokensModule {}
