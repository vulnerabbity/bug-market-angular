import { Component, Input } from "@angular/core"

@Component({
  template: ""
})
export class BaseButtonLinkComponent {
  @Input()
  text: string | null = null

  @Input()
  tooltip = ""

  @Input()
  label: string = ""

  @Input()
  matIconName: string | null = null

  @Input()
  iconPosition: "before" | "after" = "before"

  @Input()
  iconSize: "big" | "small" = "big"

  @Input()
  disabled: boolean = false

  getMaterialClass() {
    if (this.isIconOnly()) {
      return "mat-icon-button"
    }
    return "mat-button"
  }

  protected isIconOnly(): boolean {
    return this.hasIcon() && this.hasText() === false
  }

  protected hasIcon(): boolean {
    return !!this.matIconName
  }

  protected hasText(): boolean {
    const hasText = !!this.text
    return hasText
  }
}
