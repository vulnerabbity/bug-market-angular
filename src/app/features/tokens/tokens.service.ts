import { TokensLocalStorageService } from "../local-storage/tokens.service"
import {
  AppJwtPayload,
  ParseAppTokenErrorsEnum,
  AppAccessTokenPayload,
  ParseAccessTokenErrorsEnum
} from "./tokens.interface"

export class TokensService {
  private tokensStorage = new TokensLocalStorageService()

  isTokenExpired(token: string): boolean {
    const parsedTokenBody = this.parseAppToken(token)
    const { exp: expirationIsoSeconds } = parsedTokenBody
    const currentIsoSeconds = this.getCurrentIsoSeconds()
    return currentIsoSeconds >= expirationIsoSeconds
  }

  parseAccessToken(token: string): AppAccessTokenPayload {
    const parsedTokenPayload = this.parseAppToken(token) as AppAccessTokenPayload

    const hasRoles = parsedTokenPayload.roles instanceof Array
    if (hasRoles === false) {
      throw new Error(ParseAccessTokenErrorsEnum.InvalidRoles)
    }

    const invalidTokenType = parsedTokenPayload.tokenType !== "access"
    if (invalidTokenType) {
      throw new Error(ParseAccessTokenErrorsEnum.InvalidTokenType)
    }

    return parsedTokenPayload
  }

  parseAccessTokenFromStorage(): AppAccessTokenPayload | null {
    const hasAccessToken = this.tokensStorage.access.isRecordExists()
    if (hasAccessToken === false) {
      return null
    }
    let accessToken: string = this.tokensStorage.access.tryToGetRecord()
    return this.parseAccessToken(accessToken)
  }

  parseAppToken(token: string): AppJwtPayload {
    const parsedPayload = this.parseToken<AppJwtPayload>(token)

    const hasExpiration = !!parsedPayload.exp
    if (hasExpiration === false) {
      throw new Error(ParseAppTokenErrorsEnum.NoExpiration)
    }

    const hasIssueTime = !!parsedPayload.iat
    if (hasIssueTime === false) {
      throw new Error(ParseAppTokenErrorsEnum.NoIssuedAt)
    }

    const hasUserId = typeof parsedPayload.userId === "string"
    if (hasUserId === false) {
      throw new Error(ParseAppTokenErrorsEnum.NoUserId)
    }

    return parsedPayload
  }

  parseToken<T extends {} = {}>(token: string): T {
    const tokenParts = token.split(".")

    if (tokenParts.length !== 3) {
      throw new Error("Invalid token shape")
    }
    // 0 - head. 1 - payload. 2 - signature
    const payloadTokenPart = tokenParts[1]

    const jsonPayload = this.base64ToAscii(payloadTokenPart)
    const parsedTokenPayload = JSON.parse(jsonPayload)
    return parsedTokenPayload as T
  }

  private base64ToAscii(base64String: string): string {
    return atob(base64String)
  }

  private getCurrentIsoSeconds() {
    return new Date().getTime() / 1000
  }
}
