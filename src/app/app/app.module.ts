import { NgModule, Provider } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { GraphqlModule } from "./graphql.module"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AppNavbarComponent } from "./navbar/navbar.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AuthenticationInterceptorProvider } from "../common/interceptors/authentication.interceptor"
import { AppCommonModule } from "../common/common.module"
import { AppPreferencesConfigModule } from "../features/preferences/preferences.module"
import { RefreshTokenInterceptorProvider } from "../common/interceptors/refresh-token.interceptor"
import { ErrorsPageModule } from "../pages/errors/errors-page.module"

const imports = [
  BrowserModule,
  AppRoutingModule,
  AppCommonModule,
  BrowserAnimationsModule,
  GraphqlModule,
  AppPreferencesConfigModule,
  ErrorsPageModule
]

const interceptors: Provider[] = [
  RefreshTokenInterceptorProvider,
  AuthenticationInterceptorProvider
]

@NgModule({
  declarations: [AppComponent, AppNavbarComponent],
  imports,
  providers: [...interceptors],
  bootstrap: [AppComponent]
})
export class AppModule {}
