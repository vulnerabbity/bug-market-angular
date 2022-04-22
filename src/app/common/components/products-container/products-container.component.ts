import { Component, Input, OnInit } from "@angular/core"
import { ShortProduct } from "src/app/features/products/products.interface"
import { AppLinksService } from "../../services/links.service"

@Component({
  selector: "common-products-container",
  templateUrl: "./products-container.component.html",
  styleUrls: ["./products-container.component.scss"]
})
export class CommonProductsContainer {
  @Input()
  products: ShortProduct[] = []

  constructor(private linksService: AppLinksService) {}

  getProductLink(product: ShortProduct) {
    return this.linksService.getLinkToProduct(product.id)
  }
}
