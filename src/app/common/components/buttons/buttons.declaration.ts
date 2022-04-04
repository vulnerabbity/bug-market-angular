import { CommonButtonComponent } from "./button-link/button.component"
import { CommonLinkComponent } from "./button-link/link.component"
import { CommonHomeLinkComponent } from "./links/home.component"
import { CommonLoginButtonComponent } from "./buttons/login.component"
import { CommonManageAccountButtonComponent } from "./buttons/account-actions/account-actions.component"
import { CommonPreferencesLinkComponent } from "./links/preferences.component"
import { CommonCreateProductLinkComponent } from "./links/product-create.component"
import { ProductsLinkComponent } from "./links/products.component"
import { CommonGoToProfileMenuLinkComponent } from "./menu/to-profile.component"
import { CommonLogoutMenuButtonComponent } from "./menu/logout.component"
import { CommonLoginOrManageButtonComponent } from "./buttons/login-or-manage.component"

export const commonButtonsComponents = [
  CommonLinkComponent,
  CommonButtonComponent,
  CommonLoginButtonComponent,
  CommonLogoutMenuButtonComponent,
  CommonPreferencesLinkComponent,
  CommonCreateProductLinkComponent,
  CommonManageAccountButtonComponent,
  CommonHomeLinkComponent,
  CommonGoToProfileMenuLinkComponent,
  CommonLoginOrManageButtonComponent,
  ProductsLinkComponent
]
