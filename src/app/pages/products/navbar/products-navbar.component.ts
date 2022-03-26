import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Component({
  selector: "products-navbar",
  templateUrl: "./products-navbar.component.html",
  styleUrls: ["./products-navbar.component.scss"]
})
export class ProductsNavbarComponent {
  createProductPath = AppPathsEnum.CreateProduct
}
