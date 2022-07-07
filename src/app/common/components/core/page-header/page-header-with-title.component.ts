import { Component, Input } from "@angular/core"

@Component({
  selector: "common-titled-page-header",
  styleUrls: ["./page-header-with-title.component.scss"],
  template: `
    <common-themed-div color="primary">
      <div class="component-root">
        <h1 class="title" role="none">{{ title }}</h1>

        <ng-content class="input-content"></ng-content>
      </div>
    </common-themed-div>
  `
})
export class CommonPageHeaderWithTitleComponent {
  @Input()
  title: string = "header"

  @Input()
  titleLimit: number | null = null
}
