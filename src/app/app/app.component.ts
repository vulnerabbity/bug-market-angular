import { Component } from "@angular/core"
import { ThemeLocalStorageService } from "../features/preferences/storage/theme-storage.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private theme: ThemeLocalStorageService) {}
  title = "bug-market-angular"

  getTheme() {
    return this.theme.tryToGetRecord()
  }
}
