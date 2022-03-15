import { Component, Input } from "@angular/core"

@Component({
  selector: "common-page-header",
  styleUrls: ["./page-header.component.scss"],
  template: `
    <mat-toolbar color="primary" class="shadow-top">
      <header class="header">
        <h1 class="header__text">{{ title }}</h1>
      </header>
    </mat-toolbar>
  `
})
export class CommonPageHeaderComponent {
  @Input()
  title: string = "header"
}
