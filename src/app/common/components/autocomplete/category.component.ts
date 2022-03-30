import { Component, EventEmitter, Input, Output } from "@angular/core"
import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms"
import { ProductCategory } from "src/app/features/categories/categories.interface"
import { ProductCategoriesService } from "src/app/features/categories/categories.service"

interface ProductCategoryAutocompleteModel {
  isValid: boolean
  selectedCategory: ProductCategory | null
}

@Component({
  selector: "common-product-category-autocomplete",
  template: `
    <mat-form-field class="component-root" appearance="fill">
      <mat-label>Category</mat-label>
      <input
        type="text"
        matInput
        required
        [matAutocomplete]="auto"
        [formControl]="searchControl"
        (ngModelChange)="onSearchChange()"
      />
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="parseCategoryName.bind(this)">
        <mat-option *ngFor="let category of filteredCategories" [value]="category">
          {{ category.visualName }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <style>
      .component-root {
        display: block;
        width: 100%;
      }
    </style>
  `
})
export class CommonProductCategoryAutocomplete {
  @Input()
  set defaultCategory(value: ProductCategory) {
    this.searchControl.setValue(value)
  }

  // Name model is reserved for two way binding in angular
  @Input()
  model = initProductCategoryAutocompleteModel()

  // Name modelChange is reserved for two way binding in angular
  @Output()
  modelChange = new EventEmitter()

  categories: ProductCategory[] = this.categoriesService.getCategoriesLocal()

  filteredCategories = this.categories

  searchControl = new FormControl("")

  get searchString(): string {
    const controlValue: string | ProductCategory = this.searchControl.value
    if (typeof controlValue === "string") {
      return controlValue
    }
    return controlValue.visualName
  }

  constructor(private categoriesService: ProductCategoriesService) {
    this.searchControl.setValidators(ValidatorIsCategorySelected())
  }

  getSelectedCategoryOrNull(): ProductCategory | null {
    if (isCategorySelected(this.searchControl)) {
      return this.searchControl.value
    }
    return null
  }

  parseCategoryName(category: ProductCategory): string {
    return category.visualName
  }

  onSearchChange(): void {
    this.modelChange.emit(this.getActualModelValue())
    this.filteredCategories = this.categoriesService.fuzzySearchLocal(this.searchString)
  }

  getActualModelValue(): ProductCategoryAutocompleteModel {
    return {
      isValid: isCategorySelected(this.searchControl),
      selectedCategory: this.getSelectedCategoryOrNull()
    }
  }
}

function ValidatorIsCategorySelected(): ValidatorFn {
  return (control: AbstractControl) => {
    const categoryNotSelected = isCategorySelected(control) === false
    if (categoryNotSelected) {
      return { test: true }
    }
    return null
  }
}

function isCategorySelected(control: AbstractControl): boolean {
  return !!control.value.visualName
}

export function initProductCategoryAutocompleteModel(): ProductCategoryAutocompleteModel {
  return {
    isValid: false,
    selectedCategory: null
  }
}
