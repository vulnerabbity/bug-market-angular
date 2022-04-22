import { NgModule } from "@angular/core"
import { Route, RouterModule } from "@angular/router"
import { PreloadModuleOnDemand } from "../common/routing/preload-on-demand.strategy"
import { ConcreteProductPageComponent } from "../pages/concrete-product/concrete-product.component"
import { CreateProductPageComponent } from "../pages/manage-product/create-product/create-product.component"
import { HomePageComponent } from "../pages/home/home-page.component"
import { ProductsPageComponent } from "../pages/products/products-page.component"
import { UpdateProductPageComponent } from "../pages/manage-product/update-product/update-product.component"
import { ViewUserPage } from "../pages/user/view-user/view-user.page"
import { EditUserPage } from "../pages/user/edit-user/edit-user.page"
import { ChatsListPage } from "../pages/chat-pages/chats-list/chats-list.page"
import { ConcreteChatPage } from "../pages/chat-pages/concrete-chat/concrete-chat.page"

export enum AppPathsEnum {
  Products = "products",
  ConcreteProduct = "product",
  UserPage = "user",
  EditUserPage = "edit-user",
  CreateProduct = "create-product",
  UpdateProduct = "update-product",
  ChatsList = "chats",
  ConcreteChat = "chat"
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

const concreteProductRoute: Route = {
  path: `${AppPathsEnum.ConcreteProduct}/:id`,
  loadChildren: () =>
    import("../pages/concrete-product/concrete-product.module").then(
      m => m.ConcreteProductPageModule
    ),
  component: ConcreteProductPageComponent,
  data: { preload: true }
}

const userPageRoute: Route = {
  path: `${AppPathsEnum.UserPage}/:id`,
  loadChildren: () =>
    import("../pages/user/view-user/view-user.module").then(m => m.ViewUserPageModule),
  component: ViewUserPage
}

const editUserPageRoute: Route = {
  path: `${AppPathsEnum.EditUserPage}/:id`,
  loadChildren: () =>
    import("../pages/user/edit-user/edit-user.module").then(m => m.EditUserModule),
  component: EditUserPage
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
  path: `${AppPathsEnum.UpdateProduct}/:id`,
  loadChildren: () =>
    import("../pages/manage-product/update-product/update-product.module").then(
      m => m.UpdateProductPageModule
    ),
  component: UpdateProductPageComponent
}

const chatsListRoute: Route = {
  path: AppPathsEnum.ChatsList,
  loadChildren: () =>
    import("../pages/chat-pages/chats-list/chats-list.module").then(m => m.ChatsListModule),
  component: ChatsListPage
}

const concreteChatRoute: Route = {
  path: `${AppPathsEnum.ConcreteChat}/:id`,
  loadChildren: () =>
    import("../pages/chat-pages/concrete-chat/concrete-chat.module").then(
      m => m.ConcreteChatModule
    ),
  component: ConcreteChatPage
}

const routes: Route[] = [
  homeRoute,
  productsRoute,
  concreteProductRoute,
  userPageRoute,
  editUserPageRoute,
  createProductRoute,
  updateProductRoute,
  chatsListRoute,
  concreteChatRoute
]

const imports = [RouterModule.forRoot(routes, { preloadingStrategy: PreloadModuleOnDemand })]
@NgModule({
  imports,
  providers: [PreloadModuleOnDemand],
  exports: [RouterModule]
})
export class AppRoutingModule {}
