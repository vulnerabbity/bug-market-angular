import { Injectable } from "@angular/core"
import { firstValueFrom, map, Observable, tap } from "rxjs"
import { RefreshAccessTokenGQL, RefreshAccessTokenQueryVariables } from "src/generated-gql-types"
import { AccessTokenLocalStorageService } from "../../local-storage/access-token.service"
import { RefreshTokenLocalStorageService } from "../../local-storage/refresh-token.service"

@Injectable({
  providedIn: "root"
})
export class AccessTokenRefresherService {
  private refreshTokenStorage = new RefreshTokenLocalStorageService()
  private accessTokenStorage = new AccessTokenLocalStorageService()
  constructor(private refreshTokenQuery: RefreshAccessTokenGQL) {}

  async refreshAccessTokenAsync() {
    return await firstValueFrom(this.refreshAccessToken$())
  }

  refreshAccessToken$(): Observable<void> {
    const refreshToken = this.refreshTokenStorage.tryToGetRecord()

    return this.refreshTokenQuery.fetch({ refreshToken }).pipe(
      tap(response => {
        const error = response.errors?.[0]
        if (error) {
          return console.log(`refreshing error`, error)
        }

        const { access_token } = response.data.refreshAccessToken
        return this.accessTokenStorage.saveRecord(access_token)
      }),
      map(() => {
        return
      })
    )
  }
}
