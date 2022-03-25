import { Component, OnInit } from "@angular/core"
import { Validators } from "@angular/forms"
import { FormsErrorMessenger } from "src/app/common/forms/forms-error-messenger"
import { FormsErrorDetector } from "src/app/common/forms/forms.error-detector"
import { AbstractCommonFormField } from "./abstract-form-field"

@Component({
  selector: `common-password-form-field`,
  styleUrls: ["./form-field.scss"],
  template: `
    <mat-form-field [formGroup]="this.localFormGroup" class="form-field" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input
        (ngModelChange)="this.OnInputChange()"
        [formControlName]="this.controlName"
        matInput
        [type]="isPasswordHidden ? 'password' : 'text'"
      />
      <button
        mat-icon-button
        matSuffix
        type="button"
        (click)="togglePasswordState()"
        [attr.aria-label]="'Hide password'"
        [attr.aria-pressed]="isPasswordHidden"
      >
        <mat-icon>{{ isPasswordHidden ? "visibility_off" : "visibility" }}</mat-icon>
      </button>

      <mat-error *ngIf="this.errorChecker.hasValidationErrors()">
        <span *ngIf="this.errorChecker.isRequiredError()">This field is required</span>
        <span *ngIf="this.errorChecker.isMinLengthError()">
          {{ this.errorMessenger.getMinLengthMessage() }}
        </span>
      </mat-error>
    </mat-form-field>
  `
})
export class CommonPasswordFieldComponent extends AbstractCommonFormField implements OnInit {
  label = "Enter your password"

  controlName: string = "password"

  isPasswordHidden = true

  validators = [Validators.minLength(8), Validators.required]

  errorChecker!: FormsErrorDetector
  errorMessenger!: FormsErrorMessenger

  ngOnInit(): void {
    super.ngOnInit()
    this.errorChecker = new FormsErrorDetector(this.formControl)
    this.errorMessenger = new FormsErrorMessenger(this.formControl, "Password")
  }

  togglePasswordState() {
    this.isPasswordHidden = !this.isPasswordHidden
  }
}
