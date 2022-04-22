import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { FormsErrorDetector } from "src/app/common/forms/forms.error-detector"
import { AppFormValidators } from "src/app/common/forms/forms.validators"
import { AbstractCommonFormField } from "./abstract-form-field"

@Component({
  selector: `common-username-form-field`,
  styleUrls: ["./form-field.scss"],
  template: `
    <mat-form-field [formGroup]="this.localFormGroup" class="form-field" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input
        (ngModelChange)="this.OnInputChange()"
        [formControlName]="this.controlName"
        matInput
        maxlength="24"
      />
      <mat-error *ngIf="!isRequiredError()">Invalid username</mat-error>
    </mat-form-field>
  `
})
export class CommonUsernameFieldComponent extends AbstractCommonFormField {
  label = "Username"

  validators = [Validators.required, AppFormValidators.usernameWithLength]

  isRequiredError() {
    return this.errorDetector.isRequiredError()
  }
}
