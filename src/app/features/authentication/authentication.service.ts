import { Injectable } from "@angular/core"
import { Observable, pluck, tap, firstValueFrom } from "rxjs"
import {
  LoginResponse,
  LoginWithUsernameGQL,
  LoginWithUsernameQueryVariables
} from "src/generated-gql-types"
import { AccessTokenLocalStorageService } from "../local-storage/access-token.service"
import { RefreshTokenLocalStorageService } from "../local-storage/refresh-token.service"

export type LoginStatus = "success" | "not-found" | "invalid-password" | "misc"

enum BackendAuthenticationErrors {
  NotFound = "User not found",
  InvalidPassword = "Invalid password"
}

interface TokenPair {
  access_token: string
  refresh_token: string
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private readonly accessTokenStorage = new AccessTokenLocalStorageService()
  private readonly refreshTokenStorage = new RefreshTokenLocalStorageService()

  constructor(private loginWithUsernameQuery: LoginWithUsernameGQL) {}

  async loginWithUsername(variables: LoginWithUsernameQueryVariables): Promise<LoginStatus> {
    try {
      const tokens = await firstValueFrom(this.sendCredentials$(variables))
      this.saveTokens(tokens)
      return "success"
    } catch (err: any) {
      if (err.message === BackendAuthenticationErrors.NotFound) {
        return "not-found"
      }
      if (err.message === BackendAuthenticationErrors.InvalidPassword) {
        return "invalid-password"
      }
      return "misc"
    }
  }

  logout(): void {
    this.logoutLocally()
  }

  private logoutLocally() {
    this.deleteTokens()
  }

  private saveTokens(tokens: TokenPair) {
    this.accessTokenStorage.saveRecord(tokens.access_token)
    this.refreshTokenStorage.saveRecord(tokens.refresh_token)
  }

  private deleteTokens() {
    this.accessTokenStorage.deleteRecord()
    this.refreshTokenStorage.deleteRecord()
  }

  private sendCredentials$(variables: LoginWithUsernameQueryVariables): Observable<LoginResponse> {
    return this.loginWithUsernameQuery.fetch(variables).pipe(
      tap(response => {
        if (!response.errors) {
          return response
        }
        const error = response.errors[0]
        const errorMessage = error.message

        if (errorMessage === BackendAuthenticationErrors.NotFound) {
          throw new Error(BackendAuthenticationErrors.NotFound)
        }

        if (errorMessage === BackendAuthenticationErrors.InvalidPassword) {
          throw new Error(BackendAuthenticationErrors.InvalidPassword)
        }

        throw new Error("UnknownError")
      }),
      pluck("data", "loginWithUsername")
    )
  }
}
