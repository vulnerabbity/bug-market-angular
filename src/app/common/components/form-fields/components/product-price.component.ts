import { Component, OnInit } from "@angular/core"
import { Validators } from "@angular/forms"
import { AbstractCommonFormField } from "./abstract-form-field"

@Component({
  selector: `common-product-price-form-field`,
  styleUrls: ["./form-field.scss"],
  template: `
    <mat-form-field
      class="form-field"
      [formGroup]="this.localFormGroup"
      appearance="outline"
      style="overflow: visible; display: block"
    >
      <mat-label>{{ label }}</mat-label>
      <input
        (keypress)="preventKeypressIfNotNumber($event)"
        (paste)="preventPasteIfNotNumber($event)"
        (ngModelChange)="OnInputChange()"
        [formControlName]="controlName"
        matInput
        type="number"
      />

      <mat-error *ngIf="!isFormValid()">
        {{ getErrorMessage() }}
      </mat-error>
    </mat-form-field>
  `
})
export class CommonProductPriceFieldComponent extends AbstractCommonFormField implements OnInit {
  label = "Product price"

  get currentPrice(): number {
    return Number(this.inputText)
  }

  validators = [Validators.required, Validators.min(0), Validators.max(999_999_999_999)]

  ngOnInit(): void {
    super.ngOnInit()
    this.inputText = "0"
  }

  isFormValid(): boolean {
    return this.errorDetector.hasValidationErrors() === false
  }

  getErrorMessage(): string {
    if (this.errorDetector.hasValidationErrors() === false) {
      return "Has no errors"
    }
    if (this.errorDetector.isRequiredError()) {
      return "This field is required"
    }
    if (this.errorDetector.isMaxError()) {
      return "Price too big"
    }

    return "Unknown error"
  }

  preventKeypressIfNotNumber($event: { charCode: number }): boolean {
    return $event.charCode >= 48 && $event.charCode < 58
  }

  preventPasteIfNotNumber($event: any) {
    const pastedContent = $event.clipboardData.getData("text")
    if (this.isNumber(pastedContent)) {
      return
    }
    $event.preventDefault()
  }

  private isNumber(candidate: string): boolean {
    const candidateNumber = Number(candidate)
    const convertedCorrectly = isNaN(candidateNumber) === false
    return convertedCorrectly
  }
}
