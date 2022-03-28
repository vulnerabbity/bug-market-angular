import { Component, Input, OnInit } from "@angular/core"
import { Validators } from "@angular/forms"
import { FormsErrorDetector } from "src/app/common/forms/forms.error-detector"
import { AbstractCommonFormField } from "./abstract-form-field"

const apiProductNameLengthLimit = 64
const apiProductNameMinLenth = 2

@Component({
  selector: `common-product-name-form-field`,
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
        (ngModelChange)="this.OnInputChange()"
        [formControlName]="this.controlName"
        matInput
        [maxlength]="maxNameLength"
      />
      <mat-hint align="end"> {{ currentNameLength }} / {{ maxNameLength }} </mat-hint>

      <mat-error *ngIf="!isFormValid()">
        {{ getErrorMessage() }}
      </mat-error>
    </mat-form-field>
  `
})
export class CommonProductNameFieldComponent extends AbstractCommonFormField implements OnInit {
  @Input()
  label = "Product name"

  @Input()
  isRequired = true

  get currentName(): string {
    return this.inputText
  }

  get currentNameLength(): number {
    return this.currentName.length
  }

  maxNameLength = apiProductNameLengthLimit
  minNameLength = apiProductNameMinLenth

  errorDetector!: FormsErrorDetector

  ngOnInit(): void {
    super.ngOnInit()
    this.initValidators()
    this.errorDetector = new FormsErrorDetector(this.formControl)
  }

  isFormValid(): boolean {
    return this.errorDetector.hasValidationErrors() === false
  }

  getErrorMessage(): string {
    if (this.errorDetector.hasValidationErrors() === false) {
      return "Has no errors"
    }
    if (this.errorDetector.isMinLengthError()) {
      return `Minimal length is ${this.minNameLength}`
    }

    if (this.errorDetector.isRequiredError()) {
      return "Product name is required"
    }
    return "Unknown error"
  }

  private initValidators() {
    if (this.isRequired) {
      this.validators.push(Validators.required)
    }
    this.validators.push(Validators.minLength(this.minNameLength))
  }
}
