import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
  selector: "paginator-page-button[pageNumber]",
  template: `
    <button (click)="clickEmitter.emit()" mat-raised-button [color]="getButtonColor()">
      {{ pageNumber }}
    </button>
  `
})
export class PaginatorPageButton {
  @Input()
  isActive = false

  @Input()
  pageNumber = 1

  @Input()
  color: "primary" | "accent" | "" = "primary"

  @Output("onClick")
  clickEmitter = new EventEmitter()

  getButtonColor(): string {
    if (this.isActive) {
      return this.color
    }
    return ""
  }
}
