import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppComponent } from "./components/app/app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MaterialModule } from "./modules/material.module"
import { GraphqlModule } from "./modules/graphql.module"

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, GraphqlModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
