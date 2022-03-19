import { Component, Input } from "@angular/core"

@Component({
  selector: "common-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class CommonProductCardComponent {
  @Input()
  title = "Product title"

  @Input()
  price: number = 0

  @Input()
  currency = "$"

  @Input()
  imageUrl = "assets/pictures/no-image.webp"

  get hasPrice(): boolean {
    return this.price != 0
  }
}
