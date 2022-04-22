import { Component } from "@angular/core"

@Component({
  selector: "common-page-header",
  styleUrls: ["./page-header.component.scss"],
  template: `
    <common-themed-div class="component-root" color="primary">
      <header class="header">
        <ng-content class="div-content"></ng-content>
      </header>
    </common-themed-div>
    <div class="inner-shadow-top"></div>
  `
})
export class CommonPageHeaderComponent {}
