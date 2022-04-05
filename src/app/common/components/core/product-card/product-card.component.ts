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
  imageUrl?: string

  get hasPrice(): boolean {
    return this.price != 0
  }

  get imageUrlOrDefault(): string {
    if (this.imageUrl) {
      return this.imageUrl
    }

    const defaultImage = "assets/pictures/no-image.webp"
    return defaultImage
  }
}
