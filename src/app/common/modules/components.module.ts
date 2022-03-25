import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "../../modules/material.module"
import { CommonPageHeaderComponent } from "../components/page-header/page-header.component"
import { CommonProductCardComponent } from "../components/product-card/product-card.component"
import { CommonProductsContainer } from "../components/products-container/products-container.component"
import { CommonThemedDiv } from "../components/themed-div/themed-div.component"
import { RouterModule } from "@angular/router"
import { CarouselModule } from "ngx-owl-carousel-o"
import { CommonCarousel } from "../components/carousel/carousel.component"
import { CommonDataFieldComponent } from "../components/data-field/data-field.component"
import { CommonTitleTextCardComponent } from "../components/title-text-card/title-text-card.component"
import { CommonLoginDialogComponent } from "../components/dialogs/login/login-dialog.component"
import { CommonRegisterDialogComponent } from "../components/dialogs/register/register-dialog.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { commonAppFormFieldsComponents } from "../components/form-fields/form-fields.declarations"

const passThroughModules = [
  MaterialModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
]

const passThroughComponents = [
  CommonPageHeaderComponent,
  CommonProductCardComponent,
  CommonThemedDiv,
  CommonProductCardComponent,
  CommonProductsContainer,
  CommonCarousel,
  CommonDataFieldComponent,
  CommonTitleTextCardComponent,
  CommonLoginDialogComponent,
  CommonRegisterDialogComponent,
  commonAppFormFieldsComponents
]

@NgModule({
  imports: [passThroughModules, CarouselModule],
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
