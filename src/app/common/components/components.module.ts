import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "./material.module"
import { CommonProductsContainer } from "./products-container/products-container.component"
import { RouterModule } from "@angular/router"
import { CarouselModule } from "ngx-owl-carousel-o"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { commonAppFormFieldsComponents } from "./form-fields/form-fields.declarations"
import { commonAutocompleteComponents } from "./autocomplete/autocomplete.declaration"
import { commonDragAndDropComponents } from "./drag-and-drop/drag-and-drop.declarations"
import { AppFilepondModule } from "./filepond.module"
import { CommonDirectivesModule } from "../directives/directives.module"
import { commonExpanderComponents } from "./expanders/expanders.declarations"
import { commonCardsComponents } from "./cards/cards.declaration"
import { commonButtonsComponents } from "./buttons/buttons.declaration"
import { commonDialogsComponents } from "./dialogs/dialogs.declaration"
import { commonTogglersComponents } from "./togglers/togglers.declaration"
import { CommonPageHeaderComponent } from "./core/page-header/page-header.component"
import { CommonPageHeaderWithTitleComponent } from "./core/page-header/page-header-with-title.component"
import { CommonProductCardComponent } from "./core/product-card/product-card.component"
import { CommonThemedDiv } from "./core/themed-div/themed-div.component"
import { CommonCarousel } from "./core/carousel/carousel.component"
import { CommonDataFieldComponent } from "./core/data-field/data-field.component"
import { CommonRangeComponent } from "./core/range/range.component"

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
  CommonRangeComponent,
  commonDialogsComponents,
  commonAppFormFieldsComponents,
  commonAutocompleteComponents,
  commonDragAndDropComponents,
  commonExpanderComponents,
  commonCardsComponents,
  commonButtonsComponents,
  commonTogglersComponents
]

@NgModule({
  imports: [passThroughModules, CarouselModule, AppFilepondModule, CommonDirectivesModule],
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
