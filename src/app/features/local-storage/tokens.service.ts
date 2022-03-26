import { AccessTokenLocalStorageService } from "./access-token.service"
import { RefreshTokenLocalStorageService } from "./refresh-token.service"

export class TokensLocalStorageService {
  access = new AccessTokenLocalStorageService()
  refresh = new RefreshTokenLocalStorageService()
}
