import { NgModule } from "@angular/core"
import { Route, RouterModule } from "@angular/router"
import { PreloadModuleOnDemand } from "../common/routing/preload-on-demand.strategy"
import { ConcreteProductPageComponent } from "../pages/concrete-product/concrete-product.component"
import { CreateProductPageComponent } from "../pages/manage-product/create-product/create-product.component"
import { HomePageComponent } from "../pages/home/home-page.component"
import { PreferencesPageComponent } from "../pages/preferences/preferences-page.component"
import { ProductsPageComponent } from "../pages/products/products-page.component"
import { UserPageComponent } from "../pages/user/user-page.component"
import { UpdateProductPageComponent } from "../pages/manage-product/update-product/update-product.component"

export enum AppPathsEnum {
  Products = "products",
  Preferences = "preferences",
  ConcreteProduct = "product/:id",
  UserPage = "user/:id",
  CreateProduct = "create-product",
  UpdateProduct = "update-product/:id"
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

const createProductRoute: Route = {
  path: AppPathsEnum.CreateProduct,
  loadChildren: () =>
    import("../pages/manage-product/create-product/create-product.module").then(
      m => m.CreateProductPageModule
    ),
  component: CreateProductPageComponent
}

const updateProductRoute: Route = {
  path: AppPathsEnum.UpdateProduct,
  loadChildren: () =>
    import("../pages/manage-product/update-product/update-product.module").then(
      m => m.UpdateProductPageModule
    ),
  component: UpdateProductPageComponent
}

const routes: Route[] = [
  homeRoute,
  productsRoute,
  preferencesRoute,
  concreteProductRoute,
  userPageRoute,
  createProductRoute,
  updateProductRoute
]

const imports = [RouterModule.forRoot(routes, { preloadingStrategy: PreloadModuleOnDemand })]
@NgModule({
  imports,
  providers: [PreloadModuleOnDemand],
  exports: [RouterModule]
})
export class AppRoutingModule {}
