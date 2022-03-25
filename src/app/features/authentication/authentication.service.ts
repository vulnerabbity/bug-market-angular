import { Injectable } from "@angular/core"
import { Observable, pluck, tap, firstValueFrom } from "rxjs"
import {
  LoginResponse,
  LoginWithUsernameGQL,
  LoginWithUsernameQueryVariables
} from "src/generated-gql-types"
import { AccessTokenLocalStorageService } from "../local-storage/access-token.services"

export type LoginStatus = "success" | "not-found" | "invalid-password" | "misc"

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private accessTokenStorage = new AccessTokenLocalStorageService()
  constructor(private loginWithUsernameQuery: LoginWithUsernameGQL) {}

  async loginWithUsername(variables: LoginWithUsernameQueryVariables): Promise<LoginStatus> {
    try {
      const tokens = await firstValueFrom(this.sendCredentials$(variables))
      return "success"
    } catch (err: any) {
      if (err.message === "User not found") {
        return "not-found"
      }
      if (err.message === "Invalid password") {
        return "invalid-password"
      }
      return "misc"
    }
  }

  private sendCredentials$(variables: LoginWithUsernameQueryVariables): Observable<LoginResponse> {
    return this.loginWithUsernameQuery.fetch(variables).pipe(
      tap(response => {
        if (!response.errors) {
          return response
        }
        const error = response.errors[0]
        const errorMessage = error.message

        if (errorMessage === "User not found") {
          throw new Error("User not found")
        }

        if (errorMessage === "Invalid password") {
          throw new Error("Invalid password")
        }

        throw new Error("UnknownError")
      }),
      pluck("data", "loginWithUsername")
    )
  }
}
