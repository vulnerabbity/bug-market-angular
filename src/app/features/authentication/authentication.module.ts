import { NgModule } from "@angular/core"
import { TokensModule } from "../tokens/tokens.module"
import { AuthenticationService } from "./authentication.service"

@NgModule({
  imports: [TokensModule],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
