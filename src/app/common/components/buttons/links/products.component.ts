import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Component({
  selector: "common-products-link",
  template: `
    <common-link
      [link]="link"
      text="Products"
      tooltip="Products"
      label="Go to products"
    ></common-link>
  `
})
export class ProductsLinkComponent {
  link = `/${AppPathsEnum.Products}`
}
