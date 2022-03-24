import { AbstractControl, FormControl } from "@angular/forms"
import { FormsErrorDetector } from "./forms.error-detector"

export interface LengthError {
  requiredLength: number
  actualLength: number
}

export class FormsErrorMessenger {
  errorDetector = new FormsErrorDetector(this.formControl)
  constructor(private formControl: AbstractControl, private subjectName: string) {
    if (this.errorDetector.hasValidationErrors() === false) {
      throw new Error("form control has no errors")
    }
  }

  getMinLengthMessage() {
    const minLengthError = this.parseMinlengthError()

    const { requiredLength, actualLength } = minLengthError

    return `${this.subjectName} should be ${requiredLength} symbols at least but current length is ${actualLength}`
  }

  private parseMinlengthError() {
    return this.parseErrorOrFail<LengthError>("minlength")
  }

  private parseErrorOrFail<T = {}>(errorName: string) {
    const error = this.formControl.errors![errorName]
    if (!error) {
      throw new Error(`Error ${errorName} does not exists on form control`)
    }
    return error as T
  }
}
