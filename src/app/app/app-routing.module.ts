import { NgModule } from "@angular/core"
import { Route, RouterModule } from "@angular/router"
import { HomePageComponent } from "../pages/home/home-page.component"
import { PreferencesPageComponent } from "../pages/preferences/preferences-page.component"
import { ProductsPageComponent } from "../pages/products/products-page.component"

export enum AppPathsEnum {
  Products = "products",
  Preferences = "preferences"
}

const homeRoute: Route = {
  path: "",
  component: HomePageComponent
}

const productsRoute: Route = {
  path: AppPathsEnum.Products,
  loadChildren: () =>
    import("../pages/products/products-page.module").then(m => m.ProductsPageModule),
  component: ProductsPageComponent
}

const preferencesRoute: Route = {
  path: AppPathsEnum.Preferences,
  loadChildren: () =>
    import("../pages/preferences/preferences.module").then(m => m.PreferencesPageModule),
  component: PreferencesPageComponent
}

const routes: Route[] = [homeRoute, productsRoute, preferencesRoute]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
