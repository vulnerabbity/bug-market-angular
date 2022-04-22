import { Component } from "@angular/core"
import { AppLinksService } from "src/app/common/services/links.service"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class AppNavbarComponent {
  constructor(private linksService: AppLinksService) {}

  productsLink = this.linksService.getLinkToProducts()
}
