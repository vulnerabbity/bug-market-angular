import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http"
import { Injectable, Provider } from "@angular/core"
import { from, lastValueFrom, Observable } from "rxjs"
import { AccessTokenRefresherService } from "src/app/features/tokens/refresh/access-token-refresher.service"

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  expiredTokenMessage = "Your access token is expired"
  constructor(private accessTokenRefresher: AccessTokenRefresherService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.interceptAsync(req, next))
  }

  private async interceptAsync(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    try {
      const response = await lastValueFrom(next.handle(req))

      // handle gql expiration
      const isTokenExpired = this.isAccessTokenExpiredGraphqlError(response)
      if (isTokenExpired) {
        await this.accessTokenRefresher.refreshAccessTokenAsync()
        return await lastValueFrom(next.handle(req))
      }

      return response
    } catch (error: any) {
      // handle rest expiration
      const isTokenExpired = error?.error?.message === this.expiredTokenMessage

      if (isTokenExpired) {
        await this.accessTokenRefresher.refreshAccessTokenAsync()
        return await lastValueFrom(next.handle(req))
      }

      throw error
    }
  }

  private isAccessTokenExpiredGraphqlError(response: any): boolean {
    const graphqlError = this.parseGraphqlError(response)
    if (graphqlError?.message === this.expiredTokenMessage) {
      return true
    }

    return false
  }

  private parseGraphqlError(response: any): { message: string } | null {
    const possibleError = response?.body?.errors?.[0]
    if (possibleError) {
      return possibleError
    }
    return null
  }
}

export const RefreshTokenInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshTokenInterceptor,
  multi: true
}
