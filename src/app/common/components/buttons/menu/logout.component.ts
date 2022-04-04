import { Component, EventEmitter, Output } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { firstValueFrom } from "rxjs"
import { AuthenticationService } from "src/app/features/authentication/authentication.service"
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
  constructor(
    private authenticationService: AuthenticationService,
    private dialogsManager: MatDialog
  ) {}

  @Output()
  onLogout = new EventEmitter()

  async onLogoutClick() {
    const needLogout = await this.showConfirmationDialog()
    if (needLogout) {
      this.logout()
      this.onLogout.emit()
    }
  }

  private logout() {
    this.authenticationService.logout()
  }

  private async showConfirmationDialog(): Promise<boolean> {
    const confirmDialogRef = this.dialogsManager.open(CommonConfirmDialogComponent)
    confirmDialogRef.componentInstance.confirmationText = "You sure you want logout?"

    return await firstValueFrom<boolean>(confirmDialogRef.afterClosed())
  }
}
