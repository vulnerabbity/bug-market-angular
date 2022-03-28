import { Component } from "@angular/core"
import { initProductCategoryAutocompleteModel } from "src/app/common/components/autocomplete/category.component"
import {
  FormFieldModel,
  initFromFieldModel
} from "src/app/common/components/form-fields/components/abstract-form-field"
import { ProductsService } from "src/app/features/products/products.service"
import { CreateProductInput } from "src/generated-gql-types"

export interface ManageProductFormValues {
  name: string
  categoryDatabaseName: string | null
  description: string
  price: number
}

@Component({
  template: ""
})
export abstract class ManageProductComponent {
  productNameField = initFromFieldModel()
  productPriceField: FormFieldModel = { isValid: true, value: "0" }
  productCategoryField = initProductCategoryAutocompleteModel()

  get productName(): string {
    return this.productNameField.value
  }

  set productName(value: string) {
    this.productNameField.value = value
  }

  get productPrice(): number {
    return Number.parseInt(this.productPriceField.value)
  }

  set productPrice(value: number) {
    this.productPriceField.value = String(value)
  }

  get productDescription(): string {
    return "mock description"
  }

  get productCategoryDatabaseNameOrNull(): string | null {
    return this.productCategoryField.selectedCategory?.databaseName ?? null
  }

  get formValues(): ManageProductFormValues {
    return {
      name: this.productName,
      categoryDatabaseName: this.productCategoryDatabaseNameOrNull,
      description: this.productDescription,
      price: this.productPrice
    }
  }

  get isFromValid(): boolean {
    const nameValid = this.productNameField.isValid
    const priceValid = this.productPriceField.isValid
    const categoryValid = this.productCategoryField.isValid
    return nameValid && priceValid && categoryValid
  }

  constructor(protected productsService: ProductsService) {}

  getDataToUpload(): CreateProductInput {
    if (this.isFromValid === false) {
      throw new Error("Cant get data to upload: Form data invalid")
    }

    const formData = this.formValues
    const dataToUpload: CreateProductInput = {
      name: formData.name,
      categoryName: formData.categoryDatabaseName!,
      price: formData.price
    }

    return dataToUpload
  }
}
