import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http"
import { Provider } from "@angular/core"
import { Observable } from "rxjs"
import { AccessTokenLocalStorageService } from "src/app/features/local-storage/access-token.service"
import { environment } from "src/environments/environment"

export class AuthenticationInterceptor implements HttpInterceptor {
  private accessTokenStorage = new AccessTokenLocalStorageService()
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const needAddToken = this.needAddAccessToken(req)
    if (needAddToken === false) {
      return next.handle(req)
    }

    const requestWithToken = this.addAccessTokenToRequest(req)
    return next.handle(requestWithToken)
  }

  private addAccessTokenToRequest(req: HttpRequest<any>) {
    const isAccessTokenExists = this.accessTokenStorage.isRecordExists()

    if (isAccessTokenExists === false) {
      return req
    }

    const accessToken = this.accessTokenStorage.tryToGetRecord()
    const bearerToken = this.makeBearerToken(accessToken)
    // TODO: remove later
    console.log(`patched ${req.url} with access token`)

    return req.clone({
      headers: req.headers.set("Authorization", bearerToken)
    })
  }

  private needAddAccessToken({ url }: HttpRequest<any>) {
    const trustedHosts = this.getTrustedHosts()
    let result = false

    trustedHosts.forEach(host => {
      if (url.startsWith(host)) {
        result = true
      }
    })
    return result
  }

  private getTrustedHosts(): string[] {
    return environment.hostsForTokenUsage
  }

  private makeBearerToken(jwt: string): string {
    return `bearer ${jwt}`
  }
}

export const AuthenticationInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true
}
