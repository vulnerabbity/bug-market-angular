import { NgModule } from "@angular/core"
import { Route, RouterModule } from "@angular/router"
import { PreloadModuleOnDemand } from "../common/routing/preload-on-demand.strategy"
import { ConcreteProductPageComponent } from "../pages/concrete-product/concrete-product.component"
import { HomePageComponent } from "../pages/home/home-page.component"
import { PreferencesPageComponent } from "../pages/preferences/preferences-page.component"
import { ProductsPageComponent } from "../pages/products/products-page.component"
import { UserPageComponent } from "../pages/user/user-page.component"

export enum AppPathsEnum {
  Products = "products",
  Preferences = "preferences",
  ConcreteProduct = "product/:id",
  UserPage = "user/:id"
}

const homeRoute: Route = {
  path: "",
  loadChildren: () => import("../pages/home/home-page.module").then(m => m.HomePageModule),
  component: HomePageComponent
}

const productsRoute: Route = {
  path: AppPathsEnum.Products,
  loadChildren: () =>
    import("../pages/products/products-page.module").then(m => m.ProductsPageModule),
  component: ProductsPageComponent,
  data: { preload: true }
}

const preferencesRoute: Route = {
  path: AppPathsEnum.Preferences,
  loadChildren: () =>
    import("../pages/preferences/preferences.module").then(m => m.PreferencesPageModule),
  component: PreferencesPageComponent
}

const concreteProductRoute: Route = {
  path: AppPathsEnum.ConcreteProduct,
  loadChildren: () =>
    import("../pages/concrete-product/concrete-product.module").then(
      m => m.ConcreteProductPageModule
    ),
  component: ConcreteProductPageComponent,
  data: { preload: true }
}

const userPageRoute: Route = {
  path: AppPathsEnum.UserPage,
  loadChildren: () => import("../pages/user/user-page.module").then(m => m.UserPageModule),
  component: UserPageComponent
}

const routes: Route[] = [
  homeRoute,
  productsRoute,
  preferencesRoute,
  concreteProductRoute,
  userPageRoute
]

const imports = [RouterModule.forRoot(routes, { preloadingStrategy: PreloadModuleOnDemand })]
@NgModule({
  imports,
  providers: [PreloadModuleOnDemand],
  exports: [RouterModule]
})
export class AppRoutingModule {}
