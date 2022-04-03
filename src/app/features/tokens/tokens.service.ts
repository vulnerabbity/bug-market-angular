import { AppJwtPayload, ParseAppTokenErrorsEnum } from "./tokens.interface"

export class TokensService {
  isTokenExpired(token: string): boolean {
    const parsedTokenBody = this.parseAppToken(token)
    const { exp: expirationIsoSeconds } = parsedTokenBody
    const currentIsoSeconds = this.getCurrentIsoSeconds()
    return currentIsoSeconds >= expirationIsoSeconds
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
