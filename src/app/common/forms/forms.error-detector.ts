import { AbstractControl } from "@angular/forms"

export class FormsErrorDetector {
  constructor(private formControl: AbstractControl) {}

  hasValidationErrors(): boolean {
    return !!this.formControl.errors
  }

  isRequiredError(): boolean {
    return this.isErrorName("required")
  }

  isMinLengthError(): boolean {
    return this.isErrorName("minlength")
  }

  isMinError(): boolean {
    return this.isErrorName("min")
  }

  isMaxError(): boolean {
    return this.isErrorName("max")
  }

  isErrorName(errorName: string): boolean {
    if (!this.formControl.errors) {
      return false
    }
    return !!this.formControl.errors[errorName]
  }
}
