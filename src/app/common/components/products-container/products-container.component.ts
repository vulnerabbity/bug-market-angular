import { Component, Input, OnInit } from "@angular/core"
import { ShortProduct } from "src/app/features/products/products.interface"

@Component({
  selector: "common-products-container",
  templateUrl: "./products-container.component.html",
  styleUrls: ["./products-container.component.scss"]
})
export class CommonProductsContainer implements OnInit {
  @Input()
  products: ShortProduct[] = []

  ngOnInit(): void {}
}
