import { Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { CommonLoginDialogComponent } from "../../dialogs/login/login-dialog.component"

@Component({
  selector: "common-login-button",
  template: `
    <common-button
      (onClick)="this.onLoginClick()"
      matIconName="account_circle"
      text="Login"
      tooltip="Login"
    ></common-button>
  `
})
export class CommonLoginButtonComponent {
  constructor(private dialogsManager: MatDialog) {}

  onLoginClick() {
    this.showLoginDialog()
  }

  private showLoginDialog() {
    this.dialogsManager.open(CommonLoginDialogComponent)
  }
}
