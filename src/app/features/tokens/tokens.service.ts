import { Injectable } from "@angular/core"
import { AppDecodedTokenPayload } from "./tokens.interface"

export class TokensService {
  constructor() {}

  isTokenExpired(token: string): boolean {
    const parsedTokenBody = this.parseTokenPayload(token)
    const { exp: expirationIsoSeconds } = parsedTokenBody
    const currentIsoSeconds = this.getCurrentIsoSeconds()
    return currentIsoSeconds >= expirationIsoSeconds
  }

  parseTokenPayload(token: string): AppDecodedTokenPayload {
    const tokenParts = token.split(".")

    if (tokenParts.length !== 3) {
      throw new Error("Invalid token shape")
    }

    const payloadTokenPart = tokenParts[1]

    const jsonPayload = this.base64ToAscii(payloadTokenPart)
    const parsedTokenPayload = JSON.parse(jsonPayload)
    return parsedTokenPayload
  }

  base64ToAscii(base64String: string): string {
    return atob(base64String)
  }

  private getCurrentIsoSeconds() {
    return new Date().getTime() / 1000
  }
}
