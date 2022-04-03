import { Component, Input } from "@angular/core"
import { BaseButtonLinkComponent } from "./base-button-link.component"

@Component({
  selector: "common-link",
  styleUrls: ["./button-link.component.scss", "./link.component.scss"],
  template: `
    <a
      class="button-link"
      [class.disabled]="disabled"
      [ngClass]="this.getMaterialClass()"
      matTooltipClass="tooltip"
      [routerLink]="getDisableableLink()"
      [routerLinkActive]="getActiveClass()"
      [routerLinkActiveOptions]="{ exact: true }"
      [matTooltip]="tooltip"
      [attr.aria-label]="this.label"
    >
      <span class="text-before" *ngIf="text && iconPosition === 'after'">{{ text }}</span>
      <mat-icon
        class="icon"
        [ngClass]="{ 'icon--big': iconSize === 'big' }"
        *ngIf="matIconName"
        routerLinkActive="selected-icon"
      >
        {{ matIconName }}
      </mat-icon>
      <span class="text-after" *ngIf="text && iconPosition === 'before'">{{ text }}</span>
    </a>
  `
})
export class CommonLinkComponent extends BaseButtonLinkComponent {
  @Input()
  link: string | null = null

  getActiveClass() {
    if (this.isIconOnly()) {
      return "shadow-background"
    }
    return "solid-background"
  }

  getDisableableLink(): null | string {
    if (this.disabled) {
      return null
    }
    return this.link
  }
}
