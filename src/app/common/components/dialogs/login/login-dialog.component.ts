import { Component, OnDestroy, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { CommonRegisterDialogComponent } from "../register/register-dialog.component"

@Component({
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["../login-register.shared.scss", "./login-dialog.component.scss"]
})
export class CommonLoginDialogComponent implements OnDestroy, OnInit {
  hidePassword = true

  constructor(
    private dialog: MatDialog,
    private currentDialog: MatDialogRef<CommonLoginDialogComponent>
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

  showRegisterDialogInstead() {
    this.dialog.open(CommonRegisterDialogComponent)
  }

  ngOnDestroy(): void {
    console.log("Login destroyed")
  }
}
