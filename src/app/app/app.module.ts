import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppCommonModule } from "../common/modules/common.module"
import { GraphqlModule } from "../modules/graphql.module"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AppNavbarComponent } from "./navbar/navbar.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

const imports = [
  BrowserModule,
  AppRoutingModule,
  AppCommonModule,
  BrowserAnimationsModule,
  GraphqlModule
]

@NgModule({
  declarations: [AppComponent, AppNavbarComponent],
  imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
