import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { AuthenticationService } from "src/app/features/authentication/authentication.service"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import {
  CreateSellerStatus,
  UsersCreatorService
} from "src/app/features/users/users-creator.service"
import { FormFieldModel } from "../../form-fields/components/abstract-form-field"
import { CommonLoginDialogComponent } from "../login/login-dialog.component"

@Component({
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["../login-register.shared.scss", "./register-dialog.component.scss"]
})
export class CommonRegisterDialogComponent implements OnInit {
  isLoading = false
  requestError = ""

  usernameField: FormFieldModel = { value: "", isValid: false }
  passwordField: FormFieldModel = { value: "", isValid: false }
  repeatPasswordField: FormFieldModel = { value: "", isValid: false }

  get username(): string {
    return this.usernameField.value
  }
  get password(): string {
    return this.passwordField.value
  }

  get credentials(): { username: string; password: string } {
    return { username: this.username, password: this.password }
  }

  constructor(
    private usersCreator: UsersCreatorService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private currentDialog: MatDialogRef<CommonRegisterDialogComponent>,
    private currentUserState: CurrentUserState
  ) {}

  ngOnInit(): void {
    this.initDialogSize()
  }

  async onRegister() {
    this.isLoading = true
    const createUserStatus = await this.usersCreator.createSeller(this.credentials)
    if (createUserStatus === "success") {
      await this.login()
      this.currentDialog.close()
    } else {
      this.displayRequestError(createUserStatus)
    }
    this.isLoading = false
  }

  private async login() {
    await this.authenticationService.loginWithUsername(this.credentials)
    this.currentUserState.login()
  }

  shouldDisableSubmit(): boolean {
    const formInValid = !this.isFormValid()
    const loading = this.isLoading
    return formInValid || loading
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

  private displayRequestError(status: CreateSellerStatus): void {
    if (status === "duplicate") {
      this.requestError = "This user already exists"
    } else if (status === "unknown") {
      this.requestError = "Some unexpected error happened. Sorry"
    }
  }

  private initDialogSize() {
    const width = "60rem"
    this.currentDialog.updateSize(width)
  }
}
