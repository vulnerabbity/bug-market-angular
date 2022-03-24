import { AbstractControl } from "@angular/forms"

export class FormsErrorDetector {
  constructor(private formControl: AbstractControl) {}

  hasValidationErrors(): boolean {
    return !!this.formControl.errors
  }

  isRequiredError(): boolean {
    if (!this.formControl.errors) {
      return false
    }
    return !!this.formControl.errors["required"]
  }

  isMinLengthError(): boolean {
    if (!this.formControl.errors) {
      return false
    }
    return !!this.formControl.errors["minlength"]
  }
}
