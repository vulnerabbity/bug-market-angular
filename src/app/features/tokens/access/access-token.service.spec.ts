import { AccessTokensService } from "./access-token.service"
import { AppAccessTokenPayload } from "./access-token.interface"

const appAccessTokenPayload: AppAccessTokenPayload = {
  tokenType: "access",
  userId: "f981cfcf-cce6-4c84-a1a8-57952e0c6603",
  roles: ["seller"],
  iat: 1648225584,
  exp: 9999999999
}

const appAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJ1c2VySWQiOiJmOTgxY2ZjZi1jY2U2LTRjODQtYTFhOC01Nzk1MmUwYzY2MDMiLCJyb2xlcyI6WyJzZWxsZXIiXSwiaWF0IjoxNjQ4MjI1NTg0LCJleHAiOjk5OTk5OTk5OTl9.gunCN0M-ujJPGapxNuueH6P08Hcnlj_QvMozxt_Dylo`

const appRefreshToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoIiwidXNlcklkIjoiZjk4MWNmY2YtY2NlNi00Yzg0LWExYTgtNTc5NTJlMGM2NjAzIiwic2Vzc2lvbklkIjoiYjE1NWViNTYtMmQxNy00MjlkLTljMGYtYjZjOWViOGUwNmM5IiwiaWF0IjoxNjQ4MjI1NTg0LCJleHAiOjE2Nzk3ODMxODR9.8iQAhguG-DXlaBXiLYOIjjgVAl0p7T-0X_MxXyaoFg4`

describe("AccessTokensService", async () => {
  let service = new AccessTokensService()
  beforeEach(async () => {
    service = new AccessTokensService()
  })

  describe("parseTokenPayloadOrFail method", () => {
    it("should parse valid access token", () => {
      const { roles, tokenType } = service.parseTokenPayloadOrFail(appAccessToken)
      expect(roles).toEqual(appAccessTokenPayload.roles)
      expect(tokenType).toBe("access")
    })

    it("should throw error for invalid access token", () => {
      let hasError = false
      try {
        service.parseTokenPayloadOrFail(appRefreshToken)
      } catch {
        hasError = true
      }

      expect(hasError).toBe(true)
    })
  })
})
