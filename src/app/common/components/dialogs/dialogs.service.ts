import { Injectable } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { firstValueFrom } from "rxjs"
import { CommonConfirmDialogComponent } from "./confirm/confirm-dialog.component"

export interface ConfirmationDialogInput {
  message?: string
  hint?: string
}

@Injectable({
  providedIn: "root"
})
export class CommonDialogsService {
  constructor(private dialogsManager: MatDialog) {}

  /**
   * Shows confirmation dialog and returns dialog boolean result as promise
   */
  async showConfirmDialog(input: ConfirmationDialogInput): Promise<boolean> {
    const { hint, message } = input
    const dialogRef = this.dialogsManager.open(CommonConfirmDialogComponent)

    if (message) {
      dialogRef.componentInstance.confirmationText = message
    }
    if (hint) {
      dialogRef.componentInstance.hint = hint
    }

    return await firstValueFrom<boolean>(dialogRef.afterClosed())
  }
}
