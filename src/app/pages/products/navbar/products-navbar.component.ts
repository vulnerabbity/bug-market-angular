import { Component } from "@angular/core"
import { UserStatusService } from "src/app/features/users/user-status.service"

@Component({
  selector: "products-navbar",
  templateUrl: "./products-navbar.component.html",
  styleUrls: ["./products-navbar.component.scss"],
  providers: [UserStatusService]
})
export class ProductsNavbarComponent {}
