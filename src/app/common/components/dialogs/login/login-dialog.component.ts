import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { CommonRegisterDialogComponent } from "../register/register-dialog.component"
import { FormFieldModel } from "../../form-fields/components/abstract-form-field"
import { AuthenticationService } from "src/app/features/authentication/authentication.service"
import { CurrentUserState } from "src/app/features/users/current-user.state"

@Component({
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["../login-register.shared.scss", "./login-dialog.component.scss"]
})
export class CommonLoginDialogComponent implements OnInit {
  loading = false
  requestError = ""

  usernameField: FormFieldModel = { value: "", isValid: false }
  passwordField: FormFieldModel = { value: "", isValid: false }

  get username(): string {
    return this.usernameField.value
  }

  get password(): string {
    return this.passwordField.value
  }

  constructor(
    private authentication: AuthenticationService,
    private dialog: MatDialog,
    private currentDialog: MatDialogRef<CommonLoginDialogComponent>,
    private userState: CurrentUserState
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

  async onLogin(): Promise<void> {
    this.loading = true

    const status = await this.authentication.loginWithUsername({
      username: this.username,
      password: this.password
    })

    if (status === "success") {
      this.currentDialog.close()
      this.userState.fetchState()
    }

    if (status === "not-found") {
      this.requestError = "User does not exists"
    }

    if (status === "invalid-password") {
      this.requestError = "Invalid password"
    }

    if (status === "misc") {
      this.requestError = "Unknown error"
    }

    this.loading = false
  }

  ngOnInit(): void {
    this.initDialogSize()
  }

  private initDialogSize() {
    const width = "60rem"
    this.currentDialog.updateSize(width)
  }
}
