import { Component, EventEmitter, Output } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { firstValueFrom } from "rxjs"
import { AuthenticationService } from "src/app/features/authentication/authentication.service"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { CommonConfirmDialogComponent } from "../../dialogs/confirm/confirm-dialog.component"

@Component({
  selector: "common-logout-menu-button",
  styleUrls: ["./menu.styles.scss"],
  template: `
    <button class="menu-item" (click)="onLogoutClick()" mat-menu-item>
      <mat-icon>logout</mat-icon>
      <span>Logout</span>
    </button>
  `
})
export class CommonLogoutMenuButtonComponent {
  constructor(private dialogsManager: MatDialog, private userState: CurrentUserState) {}

  async onLogoutClick() {
    const needLogout = await this.showConfirmationDialog()
    if (needLogout) {
      this.logout()
    }
  }

  private logout() {
    this.userState.logout()
  }

  private async showConfirmationDialog(): Promise<boolean> {
    const confirmDialogRef = this.dialogsManager.open(CommonConfirmDialogComponent)
    confirmDialogRef.componentInstance.confirmationText = "You sure you want to logout?"

    return await firstValueFrom<boolean>(confirmDialogRef.afterClosed())
  }
}
