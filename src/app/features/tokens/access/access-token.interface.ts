import { UserRole } from "../../authorization/authorization.interface"
import { AccessTokenType, AppJwtPayload } from "../tokens.interface"

export interface AppAccessTokenPayload extends AppJwtPayload {
  tokenType: AccessTokenType
  roles: UserRole[]
}

export enum ParseAccessTokenErrorsEnum {
  InvalidRoles = "Can't parse access token: invalid roles field",
  InvalidTokenType = `Can't parse access token: invalid token type. Expected: access`
}
