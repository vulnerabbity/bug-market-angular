export type AccessTokenType = "access"
export type RefreshTokenType = "refresh"

type TokenType = AccessTokenType | RefreshTokenType

/**
 * Payload of all tokens issued by backend
 */
export interface AppJwtPayload {
  userId: string
  exp: number
  iat: number

  tokenType: TokenType
}

export interface AppRefreshTokenPayload extends AppJwtPayload {
  sessionId: string
  tokenType: RefreshTokenType
}

export enum ParseAppTokenErrorsEnum {
  NoExpiration = "Can't parse app token: 'exp' field invalid",
  NoIssuedAt = "Can't parse app token: 'iat' field invalid",
  NoUserId = "Can't parse app token: 'userId' field invalid"
}
