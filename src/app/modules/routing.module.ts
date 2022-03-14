import { NgModule } from "@angular/core"
import { Route, RouterModule } from "@angular/router"
import { HomePageComponent } from "../pages/home/home-page.component"
import { ProductsPageComponent } from "../pages/products/products-page.component"

interface RouteWithPath extends Route {
  path: string
}

export const homeRoute: RouteWithPath = {
  path: "",
  component: HomePageComponent
}

export const productsRoute: RouteWithPath = {
  path: "products",
  loadChildren: () =>
    import("../pages/products/products-page.module").then(m => m.ProductsPageModule),
  component: ProductsPageComponent
}

const routes: Route[] = [homeRoute, productsRoute]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
