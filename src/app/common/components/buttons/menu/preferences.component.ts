import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Component({
  selector: "common-go-to-preferences-menu-link",
  styleUrls: ["./menu.styles.scss"],
  template: `
    <a [routerLink]="linkToPreferences" class="menu-item" mat-menu-item>
      <mat-icon>settings</mat-icon><span>Preferences</span>
    </a>
  `
})
export class CommonGoToPreferencesMenuLinkComponent {
  linkToPreferences = `/${AppPathsEnum.Preferences}`
}
