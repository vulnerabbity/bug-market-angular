import { Component, Input } from "@angular/core"

@Component({
  selector: "common-page-header",
  styleUrls: ["./page-header.component.scss"],
  template: `
    <common-themed-div class="component-root" color="primary">
      <header class="header">
        <h1 class="header__text">{{ title }}</h1>
      </header>
    </common-themed-div>
  `
})
export class CommonPageHeaderComponent {
  @Input()
  title: string = "header"
}
