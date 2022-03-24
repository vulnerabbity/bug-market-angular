import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from "@angular/forms"

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
  controlName: string = "controlName"

  @Input()
  appearance: "standard" | "legacy" | "fill" | "outline" = "standard"

  get formControl(): AbstractControl {
    return this.localFormGroup.get(this.controlName)!
  }

  // Name model is reserved for two way binding in angular
  @Input()
  model!: FormFieldModel

  // Name modelChange is reserved for two way binding in angular
  @Output()
  modelChange = new EventEmitter()

  localFormGroup!: FormGroup

  get inputText(): string {
    return this.localFormGroup.value[this.controlName]
  }

  protected validators: ValidatorFn[] = []

  constructor(private fb: FormBuilder) {}

  private getActualModel(): FormFieldModel {
    const isValid = this.formControl.valid
    // console.log(isValid)
    return { value: this.inputText, isValid }
  }

  ngOnInit(): void {
    this.localFormGroup = this.fb.group({
      [this.controlName]: ["", this.validators]
    })

    this.model = this.getActualModel()
  }

  OnInputChange(): void {
    this.modelChange.emit(this.getActualModel())
  }
}
