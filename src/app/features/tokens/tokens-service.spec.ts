import {
  AppAccessTokenPayload,
  AppRefreshTokenPayload,
  ParseAppTokenErrorsEnum
} from "./tokens.interface"
import { TokensService } from "./tokens.service"

const appAccessTokenPayload: AppAccessTokenPayload = {
  tokenType: "access",
  userId: "f981cfcf-cce6-4c84-a1a8-57952e0c6603",
  roles: ["seller"],
  iat: 1648225584,
  exp: 9999999999
}

const appRefreshTokenPayload: AppRefreshTokenPayload = {
  tokenType: "refresh",
  userId: "f981cfcf-cce6-4c84-a1a8-57952e0c6603",
  sessionId: "b155eb56-2d17-429d-9c0f-b6c9eb8e06c9",
  iat: 1648225584,
  exp: 1679783184
}

const emptyToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U`

const expiredAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJ1c2VySWQiOiJmOTgxY2ZjZi1jY2U2LTRjODQtYTFhOC01Nzk1MmUwYzY2MDMiLCJyb2xlcyI6WyJzZWxsZXIiXSwiaWF0IjoxNjQ4MjI1NTg0LCJleHAiOjE2NDgyMjU1ODV9.jmU5RR2N6fi3e6ezcXTaEQked02TJhY5A1Sa7BKGcmI`

const appAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJ1c2VySWQiOiJmOTgxY2ZjZi1jY2U2LTRjODQtYTFhOC01Nzk1MmUwYzY2MDMiLCJyb2xlcyI6WyJzZWxsZXIiXSwiaWF0IjoxNjQ4MjI1NTg0LCJleHAiOjk5OTk5OTk5OTl9.gunCN0M-ujJPGapxNuueH6P08Hcnlj_QvMozxt_Dylo`

const appRefreshToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoIiwidXNlcklkIjoiZjk4MWNmY2YtY2NlNi00Yzg0LWExYTgtNTc5NTJlMGM2NjAzIiwic2Vzc2lvbklkIjoiYjE1NWViNTYtMmQxNy00MjlkLTljMGYtYjZjOWViOGUwNmM5IiwiaWF0IjoxNjQ4MjI1NTg0LCJleHAiOjE2Nzk3ODMxODR9.8iQAhguG-DXlaBXiLYOIjjgVAl0p7T-0X_MxXyaoFg4`

describe("TokensService", async () => {
  let service: TokensService = new TokensService()
  beforeEach(async () => {
    service = new TokensService()
  })

  describe("parseToken method", () => {
    it("should parse token", () => {
      const parsedTokenPayload = service.parseToken(appAccessToken)
      expect(parsedTokenPayload).toEqual(appAccessTokenPayload)
    })

    it("should throw error if invalid token shape", () => {
      const notAToken = "thisIsNotAToken"
      let hasExpectedError = false
      try {
        service.parseToken(notAToken)
      } catch (err: any) {
        if (err.message === "Invalid token shape") {
          hasExpectedError = true
        }
      }
      expect(hasExpectedError).toBe(true)
    })
  })

  describe("parseAppToken method", () => {
    it("should throw error if token don't have 'iat' or 'exp'", () => {
      let hasExpectedError = false
      try {
        service.parseAppToken(emptyToken)
      } catch (err: any) {
        const isExpError = err.message === ParseAppTokenErrorsEnum.NoExpiration
        const isIatError = err.message === ParseAppTokenErrorsEnum.NoIssuedAt
        if (isExpError || isIatError) {
          hasExpectedError = true
        }
      }
      expect(hasExpectedError).toBe(true)
    })
    it("should parse app token without errors", () => {
      const { exp, iat } = service.parseAppToken(appAccessToken)

      expect(exp).toEqual(appAccessTokenPayload.exp)
      expect(iat).toEqual(appAccessTokenPayload.iat)
    })
  })

  describe("isTokenExpired method", () => {
    it("should return true if token expired", () => {
      const isExpired = service.isTokenExpired(expiredAccessToken)
      expect(isExpired).toBe(true)
    })

    it("should return false if token NOT expired", () => {
      const isExpired = service.isTokenExpired(appAccessToken)
      expect(isExpired).toBe(false)
    })
  })

  describe("parseAccessToken method", () => {
    it("should parse valid access token", () => {
      const { roles, tokenType } = service.parseAccessToken(appAccessToken)
      expect(roles).toEqual(appAccessTokenPayload.roles)
      expect(tokenType).toBe("access")
    })

    it("should throw error for invalid access token", () => {
      let hasError = false
      try {
        service.parseAccessToken(appRefreshToken)
      } catch {
        hasError = true
      }

      expect(hasError).toBe(true)
    })
  })
})
