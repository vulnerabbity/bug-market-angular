import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from "@angular/forms"
import { FormsErrorDetector } from "src/app/common/forms/forms.error-detector"

export interface FormFieldModel {
  value: string
  isValid: boolean
}

@Component({
  template: ``
})
export abstract class AbstractCommonFormField implements OnInit {
  @Input()
  abstract label: string

  @Input()
  appearance: "standard" | "legacy" | "fill" | "outline" = "standard"

  controlName = "control"

  get formControl(): AbstractControl {
    return this.localFormGroup.get(this.controlName)!
  }

  // Name model is reserved for two way binding in angular
  @Input()
  model: FormFieldModel = initFromFieldModel()

  // Name modelChange is reserved for two way binding in angular
  @Output()
  modelChange = new EventEmitter()

  localFormGroup!: FormGroup

  get inputText(): string {
    return this.localFormGroup.value[this.controlName]
  }

  set inputText(value: string) {
    this.localFormGroup.setValue({ [this.controlName]: value })
  }

  errorDetector!: FormsErrorDetector

  protected validators: ValidatorFn[] = []

  constructor(private fb: FormBuilder) {}

  private getActualModel(): FormFieldModel {
    const isValid = this.formControl.valid
    // console.log(isValid)
    return { value: this.inputText, isValid }
  }

  ngOnInit(): void {
    this.localFormGroup = this.fb.group({
      [this.controlName]: [this.model.value, this.validators]
    })

    this.errorDetector = new FormsErrorDetector(this.formControl)
  }

  OnInputChange(): void {
    this.modelChange.emit(this.getActualModel())
  }
}

export function initFromFieldModel(): FormFieldModel {
  return { value: "", isValid: false }
}
