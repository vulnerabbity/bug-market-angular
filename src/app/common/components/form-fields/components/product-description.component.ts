import { Component, Input, OnInit } from "@angular/core"
import { Validators } from "@angular/forms"
import { AbstractCommonFormField } from "./abstract-form-field"

@Component({
  selector: `common-product-description-field`,
  template: `
    <mat-form-field
      class="component-root"
      [formGroup]="this.localFormGroup"
      [appearance]="appearance"
      style="overflow: visible; display: block"
    >
      <mat-label>{{ label }}</mat-label>
      <textarea
        (ngModelChange)="this.OnInputChange()"
        [formControlName]="this.controlName"
        matInput
        cdkTextareaAutosize
        [maxlength]="maxLength"
      ></textarea>
      <mat-hint align="end"> {{ currentLength }} / {{ maxLength }} </mat-hint>
    </mat-form-field>
  `
})
export class CommonProductDescriptionFieldComponent
  extends AbstractCommonFormField
  implements OnInit
{
  @Input()
  label = "Description"
  @Input()
  maxLength = 1000
  @Input()
  isRequired = false

  appearance: "standard" | "legacy" | "fill" | "outline" = "outline"

  get currentLength(): number {
    return this.inputText.length
  }

  ngOnInit(): void {
    super.ngOnInit()

    if (this.isRequired) {
      this.validators.push(Validators.required)
    }
  }
}
