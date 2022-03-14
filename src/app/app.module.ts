import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppComponent } from "./components/app/app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MaterialModule } from "./modules/material.module"
import { GraphqlModule } from "./modules/graphql.module"
import { AppNavbarComponent } from "./components/navbar/navbar.component"
import { AppRoutingModule } from "./modules/routing.module"

@NgModule({
  declarations: [AppComponent, AppNavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    GraphqlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
