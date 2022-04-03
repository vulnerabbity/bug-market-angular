import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Component({
  selector: "common-preferences-link",
  template: `
    <common-link
      [link]="link"
      matIconName="settings"
      tooltip="Preferences"
      label="Open preferences"
    ></common-link>
  `
})
export class CommonPreferencesLinkComponent {
  link = `/${AppPathsEnum.Preferences}`
}
