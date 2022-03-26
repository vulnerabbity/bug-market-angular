import { Component, Input } from "@angular/core"

@Component({
  selector: "common-titled-page-header",
  styleUrls: ["./page-header-with-title.component.scss"],
  template: `
    <common-page-header>
      <h1 class="title">{{ title }}</h1>

      <ng-content class="input-content"></ng-content>
    </common-page-header>
  `
})
export class CommonPageHeaderWithTitleComponent {
  @Input()
  title: string = "header"
}
