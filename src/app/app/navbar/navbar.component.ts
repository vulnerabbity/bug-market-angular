import { Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { CommonLoginDialogComponent } from "src/app/common/components/dialogs/login/login-dialog.component"
import { AppPathsEnum } from "../app-routing.module"

interface NavbarLocation {
  name: string
  path: string
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class AppNavbarComponent {
  paths = AppPathsEnum

  leftLocations: NavbarLocation[] = [{ name: "Products", path: AppPathsEnum.Products }]

  locations = [...this.leftLocations]

  constructor(private dialogsManager: MatDialog) {}

  onLoginClick() {
    this.showLoginDialog()
  }

  private showLoginDialog() {
    this.dialogsManager.open(CommonLoginDialogComponent)
  }
}
