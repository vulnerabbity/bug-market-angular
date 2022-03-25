import { TokensService } from "./tokens.service"

const notExpiredPayload = {
  iat: 1516239022,
  exp: 9999999999
}

const notExpiredToken: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImV4cCI6OTk5OTk5OTk5OX0.oSx_lVbkCEqmYv_AtRv79CWsDK1rUhL48KZmm_00t34`

const expiredToken: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjIzOTAyMn0.uxa-Up5pgIzQLC4ivcRglJTWvZutE0AVkzVyH6sA_X0`

describe("TokensService", async () => {
  let service: TokensService = new TokensService()
  beforeEach(async () => {
    service = new TokensService()
  })

  describe("parseTokenPayload method", () => {
    it("should parse token", () => {
      const parsedTokenPayload = service.parseTokenPayload(notExpiredToken)
      expect(parsedTokenPayload).toEqual(notExpiredPayload)
    })

    it("should throw error if invalid token shape", () => {
      const notAToken = "thisIsNotAToken"
      let hasExpectedError = false
      try {
        service.parseTokenPayload(notAToken)
      } catch (err: any) {
        if (err.message === "Invalid token shape") {
          hasExpectedError = true
        }
      }
      expect(hasExpectedError).toBe(true)
    })
  })

  describe("isTokenExpired method", () => {
    it("should return true if token expired", () => {
      const isExpired = service.isTokenExpired(expiredToken)
      expect(isExpired).toBe(true)
    })

    it("should return false if token NOT expired", () => {
      const isExpired = service.isTokenExpired(notExpiredToken)
      expect(isExpired).toBe(false)
    })
  })
})
