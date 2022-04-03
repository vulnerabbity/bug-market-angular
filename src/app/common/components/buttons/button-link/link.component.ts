import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core"

@Component({
  selector: "common-link-component",
  styleUrls: ["./link.component.scss"],
  template: `
    <a
      #linkRef
      class="link"
      [ngClass]="this.getMaterialClass()"
      matTooltipClass="tooltip"
      [routerLink]="this.link"
      [routerLinkActive]="getActiveClass()"
      [matTooltip]="tooltip"
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
export class CommonLinkComponent implements OnInit {
  @ViewChild("linkRef", { static: true })
  linkReference!: ElementRef

  @Input()
  text: string | null = null

  @Input()
  tooltip = ""

  @Input()
  link: string | null = null

  @Input()
  label: string | null = null

  @Input()
  matIconName: string | null = null

  @Input()
  iconPosition: "before" | "after" = "before"

  @Input()
  iconSize: "big" | "small" = "big"

  ngOnInit(): void {
    this.setLabel()
  }

  getActiveClass() {
    if (this.isIconOnly()) {
      return "shadow-background"
    }
    return "solid-background"
  }

  getMaterialClass() {
    if (this.isIconOnly()) {
      return "mat-icon-button"
    }
    return "mat-button"
  }

  private isIconOnly(): boolean {
    return this.hasIcon() && this.hasText() === false
  }

  private hasIcon(): boolean {
    return !!this.matIconName
  }

  private hasText(): boolean {
    const hasText = !!this.text
    return hasText
  }

  private setLabel() {
    this.addAttributeToLinkIfTruthy("aria-label", this.label)
  }

  private addAttributeToLinkIfTruthy(key: string, value: unknown) {
    if (value) {
      this.addAttributeToLink(key, value)
    }
  }

  private addAttributeToLink(key: string, value: unknown) {
    this.linkReference.nativeElement.setAttribute(key, value)
  }
}
