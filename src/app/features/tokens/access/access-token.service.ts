import { Injectable } from "@angular/core"
import { AccessTokenLocalStorageService } from "../../local-storage/access-token.service"
import { TokensService } from "../tokens.service"
import { AppAccessTokenPayload, ParseAccessTokenErrorsEnum } from "./access-token.interface"

@Injectable({
  providedIn: "root"
})
export class AccessTokensService {
  private tokensService = new TokensService()
  private accessTokenStorage = new AccessTokenLocalStorageService()

  getTokenPayloadFromStorageOrNull(): AppAccessTokenPayload | null {
    const hasAccessToken = this.accessTokenStorage.isRecordExists()
    if (hasAccessToken === false) {
      return null
    }
    let accessToken: string = this.accessTokenStorage.tryToGetRecord()

    try {
      const payload = this.parseTokenPayloadOrFail(accessToken)
      return payload
    } catch {
      return null
    }
  }

  parseTokenPayloadOrFail(token: string): AppAccessTokenPayload {
    const payloadCandidate = this.tokensService.parseAppToken(token) as AppAccessTokenPayload

    this.validateToken(payloadCandidate)

    return payloadCandidate
  }

  private validateToken(payloadCandidate: AppAccessTokenPayload) {
    const hasRoles = payloadCandidate.roles instanceof Array
    if (hasRoles === false) {
      throw new Error(ParseAccessTokenErrorsEnum.InvalidRoles)
    }

    const invalidTokenType = payloadCandidate.tokenType !== "access"
    if (invalidTokenType) {
      throw new Error(ParseAccessTokenErrorsEnum.InvalidTokenType)
    }
  }
}
