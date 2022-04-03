import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "./material.module"
import { CommonPageHeaderComponent } from "./page-header/page-header.component"
import { CommonProductCardComponent } from "./product-card/product-card.component"
import { CommonProductsContainer } from "./products-container/products-container.component"
import { CommonThemedDiv } from "./themed-div/themed-div.component"
import { RouterModule } from "@angular/router"
import { CarouselModule } from "ngx-owl-carousel-o"
import { CommonCarousel } from "./carousel/carousel.component"
import { CommonDataFieldComponent } from "./data-field/data-field.component"
import { CommonLoginDialogComponent } from "./dialogs/login/login-dialog.component"
import { CommonRegisterDialogComponent } from "./dialogs/register/register-dialog.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { commonAppFormFieldsComponents } from "./form-fields/form-fields.declarations"
import { CommonPageHeaderWithTitleComponent } from "./page-header/page-header-with-title.component"
import { commonAutocompleteComponents } from "./autocomplete/autocomplete.declaration"
import { commonDragAndDropComponents } from "./drag-and-drop/drag-and-drop.declarations"
import { AppFilepondModule } from "./filepond.module"
import { CommonRangeComponent } from "./range/range.component"
import { CommonDirectivesModule } from "../directives/directives.module"
import { commonExpanderComponents } from "./expanders/expanders.declarations"
import { commonCardsComponents } from "./cards/cards.declaration"

const passThroughModules = [
  MaterialModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
]

const passThroughComponents = [
  CommonPageHeaderComponent,
  CommonPageHeaderWithTitleComponent,
  CommonProductCardComponent,
  CommonThemedDiv,
  CommonProductCardComponent,
  CommonProductsContainer,
  CommonCarousel,
  CommonDataFieldComponent,
  CommonLoginDialogComponent,
  CommonRegisterDialogComponent,
  CommonRangeComponent,
  commonAppFormFieldsComponents,
  commonAutocompleteComponents,
  commonDragAndDropComponents,
  commonExpanderComponents,
  commonCardsComponents
]

@NgModule({
  imports: [passThroughModules, CarouselModule, AppFilepondModule, CommonDirectivesModule],
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
