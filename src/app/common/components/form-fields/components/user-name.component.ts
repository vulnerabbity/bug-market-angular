import { Component } from "@angular/core"
import { Validators } from "@angular/forms"
import { AppFormValidators } from "src/app/common/forms/forms.validators"
import { AbstractCommonFormField } from "./abstract-form-field"

@Component({
  selector: `common-user-name-form-field`,
  styleUrls: ["./form-field.scss"],
  template: `
    <mat-form-field [formGroup]="localFormGroup" class="form-field" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input
        (ngModelChange)="this.OnInputChange()"
        [formControlName]="this.controlName"
        matInput
        [maxlength]="maxLength"
      />
      <mat-hint align="end">{{ inputText.length }}/{{ maxLength }}</mat-hint>
    </mat-form-field>
  `
})
export class CommonUserNameFieldComponent extends AbstractCommonFormField {
  label = "Your name"

  maxLength = 24

  validators = []
}
