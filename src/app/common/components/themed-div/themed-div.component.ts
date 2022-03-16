import { Component, ElementRef, Input, OnInit } from "@angular/core"

type MaterialColor = "accent" | "primary" | "warn" | ""

/**
 * Allows to use angular material dynamic themes
 * @example
 * <common-themed-div color="accent">
 *  <your-component />
 * </common-themed-div>
 */
@Component({
  selector: "common-themed-div",
  template: `
    <mat-toolbar [color]="this.color" class="div-container" role="none">
      <ng-content class="div-content"></ng-content>
    </mat-toolbar>
  `,
  styleUrls: ["./themed-div.component.scss"]
})
export class CommonThemedDiv implements OnInit {
  @Input()
  color: MaterialColor = ""
  constructor(private currentComponent: ElementRef) {}

  ngOnInit(): void {
    // disable accessibility for component because its decorative only
    this.currentComponent.nativeElement.setAttribute("role", "none")
  }
}
