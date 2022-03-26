import { AccessTokenLocalStorageService } from "./access-token.service"
import { RefreshTokenLocalStorageService } from "./refresh-token.service"

interface AccessAndRefreshToken {
  accessToken: string
  refreshToken: string
}

export class TokensLocalStorageService {
  access = new AccessTokenLocalStorageService()
  refresh = new RefreshTokenLocalStorageService()

  tryToGetAccessAndRefreshTokens(): AccessAndRefreshToken {
    const accessToken = this.access.tryToGetRecord()
    const refreshToken = this.refresh.tryToGetRecord()
    return { accessToken, refreshToken }
  }

  isAccessAndRefreshTokenExists(): boolean {
    const isAccessTokenExist = this.access.isRecordExists()
    const isRefreshTokenExists = this.refresh.isRecordExists()
    return isAccessTokenExist && isRefreshTokenExists
  }
}
