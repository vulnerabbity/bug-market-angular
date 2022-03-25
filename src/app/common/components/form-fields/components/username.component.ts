import { Component } from "@angular/core"
import { Validators } from "@angular/forms"
import { AppFormValidators } from "src/app/common/forms/forms.validators"
import { AbstractCommonFormField } from "./abstract-form-field"

@Component({
  selector: `common-username-form-field`,
  styleUrls: ["./form-field.scss"],
  template: `
    <mat-form-field [formGroup]="this.localFormGroup" class="form-field" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input (ngModelChange)="this.OnInputChange()" [formControlName]="this.controlName" matInput />
      <mat-error *ngIf="this.formControl.invalid">err</mat-error>
    </mat-form-field>
  `
})
export class CommonUsernameFieldComponent extends AbstractCommonFormField {
  controlName = "username"

  label = "Username"

  validators = [Validators.required, AppFormValidators.usernameWithLength]
}
