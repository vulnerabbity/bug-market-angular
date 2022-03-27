import { Component, OnDestroy, OnInit } from "@angular/core"
import { ManageProductComponent } from "../manage-product.component"

@Component({
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"]
})
export class CreateProductPageComponent extends ManageProductComponent implements OnInit {
  ngOnInit(): void {
    this.setInputsDefaultValues()
  }

  setInputsDefaultValues() {
    this.productNameField = { isValid: true, value: "Old computer" }
  }
}
