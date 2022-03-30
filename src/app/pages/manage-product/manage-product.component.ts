import { Component } from "@angular/core"
import { Router } from "@angular/router"
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
  productDescriptionField: FormFieldModel = { isValid: true, value: "" }

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
    return this.productDescriptionField.value
  }
  get productDescriptionOrUndefined(): string | undefined {
    const description = this.productDescription
    const isDescriptionEmpty = description === ""

    if (isDescriptionEmpty) {
      return undefined
    }

    return description
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
    const descriptionValid = this.productDescriptionField.isValid
    return nameValid && priceValid && categoryValid && descriptionValid
  }

  constructor(protected productsService: ProductsService, protected router: Router) {}

  getDataToUpload(): CreateProductInput {
    if (this.isFromValid === false) {
      throw new Error("Cant get data to upload: Form data invalid")
    }

    const formData = this.formValues
    const dataToUpload: CreateProductInput = {
      name: formData.name,
      categoryName: formData.categoryDatabaseName!,
      price: formData.price,
      description: this.productDescriptionOrUndefined
    }

    return dataToUpload
  }
}
