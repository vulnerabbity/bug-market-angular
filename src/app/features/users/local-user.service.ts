import { Injectable } from "@angular/core"
import { AppAccessTokenPayload } from "../tokens/access/access-token.interface"
import { AccessTokensService } from "../tokens/access/access-token.service"

@Injectable({
  providedIn: "root"
})
export class LocalUserService {
  constructor(private accessTokenService: AccessTokensService) {}
  getUserIdOrNull() {
    const payload = this.getPayloadOrNull()
    if (payload) {
      return payload.userId ?? null
    }
    return null
  }

  private getPayloadOrNull(): AppAccessTokenPayload | null {
    return this.accessTokenService.getTokenPayloadFromStorageOrNull()
  }
}
