import { Directive, HostListener } from "@angular/core"

@Directive({
  selector: "[numbersOnly]"
})
export class NumbersOnlyDirective {
  @HostListener("keypress", ["$event"])
  disableTextInput(e: { keyCode: number }) {
    const isNumberKey = e.keyCode >= 48 && e.keyCode <= 57
    return isNumberKey
  }

  @HostListener("paste", ["$event"])
  disablePasteNonNumber(event: ClipboardEvent) {
    const clipboardContent = event.clipboardData?.getData("text/plain") as string
    const invalidPaste = this.isNumber(clipboardContent) === false
    if (invalidPaste) {
      event.preventDefault()
    }
  }

  private isNumber(candidate: string) {
    const numberRegexp = /^[0-9]*$/g
    return RegExp(numberRegexp).test(candidate)
  }
}
