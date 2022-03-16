import { Component, Input } from "@angular/core"
import { ShortProduct } from "src/app/features/products/products.interface"

const mockImage1 = "https://material.angular.io/assets/img/examples/shiba2.jpg"

@Component({
  selector: "common-products-container",
  templateUrl: "./products-container.component.html",
  styleUrls: ["./products-container.component.scss"]
})
export class CommonProductsContainer {
  @Input()
  products: ShortProduct[] = [
    { id: "1", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 },
    { id: "2", imagesUrls: [mockImage1], name: "buy dog", price: 1 }
  ]
}
