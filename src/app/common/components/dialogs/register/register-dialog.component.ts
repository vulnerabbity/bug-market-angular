import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { FormFieldModel } from "../../form-fields/components/abstract-form-field"
import { CommonLoginDialogComponent } from "../login/login-dialog.component"

@Component({
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["../login-register.shared.scss", "./register-dialog.component.scss"]
})
export class CommonRegisterDialogComponent implements OnInit {
  usernameField: FormFieldModel = { value: "", isValid: false }
  passwordField: FormFieldModel = { value: "", isValid: false }
  repeatPasswordField: FormFieldModel = { value: "", isValid: false }

  constructor(
    private dialog: MatDialog,
    private currentDialog: MatDialogRef<CommonRegisterDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initDialogSize()
  }

  isFormValid() {
    return this.isFormFieldsValid() && this.isPasswordsMatch()
  }

  showLoginDialogInstead() {
    this.dialog.open(CommonLoginDialogComponent)

    setTimeout(() => {
      this.currentDialog.close()
    }, 100)
  }

  isFormFieldsValid(): boolean {
    const usernameValid = this.usernameField.isValid
    const passwordValid = this.passwordField.isValid
    const repeatPasswordValid = this.usernameField.isValid
    if (usernameValid && passwordValid && repeatPasswordValid) {
      return true
    }
    return false
  }

  isPasswordsMatch() {
    return this.passwordField.value === this.repeatPasswordField.value
  }

  private initDialogSize() {
    const width = "60rem"
    this.currentDialog.updateSize(width)
  }
}
