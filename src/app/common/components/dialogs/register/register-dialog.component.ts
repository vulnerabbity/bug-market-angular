import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { CommonLoginDialogComponent } from "../login/login-dialog.component"

@Component({
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["../login-register.shared.scss", "./register-dialog.component.scss"]
})
export class CommonRegisterDialogComponent implements OnInit {
  hidePassword = true

  constructor(
    private dialog: MatDialog,
    private currentDialog: MatDialogRef<CommonRegisterDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initDialogSize()
  }

  initDialogSize() {
    const width = "60rem"
    this.currentDialog.updateSize(width)
  }

  togglePasswordState() {
    this.hidePassword = !this.hidePassword
  }

  showLoginDialogInstead() {
    this.dialog.open(CommonLoginDialogComponent)

    setTimeout(() => {
      this.currentDialog.close()
    }, 100)
  }
}
