import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "./material.module"
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
import { commonCoreComponents } from "./core/core.declarations"
import { CommonDialogsService } from "./dialogs/dialogs.service"

const passThroughModules = [
  MaterialModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
]

const passThroughComponents = [
  commonCoreComponents,
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
  declarations: [...passThroughComponents],
  providers: [CommonDialogsService]
})
export class AppCommonComponentsModule {}
