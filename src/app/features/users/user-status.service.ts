import { Injectable } from "@angular/core"
import { TokensLocalStorageService } from "../local-storage/tokens.service"

@Injectable()
export class UserStatusService {
  private tokensStorage = new TokensLocalStorageService()

  isAuthenticated(): boolean {
    const isTokensExists = this.tokensStorage.isAccessAndRefreshTokenExists()
    return isTokensExists
  }
}
