import { Component } from "@angular/core"
import { homeRoute, productsRoute } from "src/app/modules/routing.module"

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
  leftLocations: NavbarLocation[] = [{ name: "Products", path: productsRoute.path }]

  locations = [...this.leftLocations]
}
