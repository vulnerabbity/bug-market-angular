import { Component, Input } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"

@Component({
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"]
})
export class CommonConfirmDialogComponent {
  @Input()
  confirmationText = "Are you sure?"

  constructor(private currentDialogRef: MatDialogRef<CommonConfirmDialogComponent>) {
    this.mapCloseResultToBoolean()
  }

  private mapCloseResultToBoolean() {
    this.currentDialogRef
      .beforeClosed()
      .subscribe(result => this.closeDialogWithBooleanResult(result))
  }

  private closeDialogWithBooleanResult(result: any) {
    this.currentDialogRef.close(!!result)
  }
}
