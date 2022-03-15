import { Component } from "@angular/core"
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
}
