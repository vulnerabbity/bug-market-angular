import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { CommonRegisterDialogComponent } from "../register/register-dialog.component"
import { FormFieldModel } from "../../form-fields/components/abstract-form-field"

@Component({
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["../login-register.shared.scss", "./login-dialog.component.scss"]
})
export class CommonLoginDialogComponent implements OnInit {
  usernameField: FormFieldModel = { value: "", isValid: false }
  passwordField: FormFieldModel = { value: "", isValid: false }

  constructor(
    private dialog: MatDialog,
    private currentDialog: MatDialogRef<CommonLoginDialogComponent>
  ) {}

  isFormValid(): boolean {
    return this.usernameField.isValid && this.passwordField.isValid
  }

  showRegisterDialogInstead() {
    this.dialog.open(CommonRegisterDialogComponent)
    setTimeout(() => {
      this.currentDialog.close()
    }, 100)
  }

  onLogin() {
    console.log(this.usernameField)
  }

  ngOnInit(): void {
    this.initDialogSize()
  }

  private initDialogSize() {
    const width = "60rem"
    this.currentDialog.updateSize(width)
  }
}
