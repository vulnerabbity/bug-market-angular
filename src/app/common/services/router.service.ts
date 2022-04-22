import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { AppLinksService } from "./links.service"

@Injectable({
  providedIn: "root"
})
export class AppRouterService {
  constructor(private router: Router, private appLinks: AppLinksService) {}

  redirectToViewUser(userId: string) {
    const viewUserPath = this.appLinks.getLinkToUser(userId)
    this.redirect(viewUserPath)
  }

  redirectToEditUser(userId: string) {
    const editUserPath = `/${AppPathsEnum.EditUserPage}/${userId}`
    this.redirect(editUserPath)
  }

  redirectToConcreteProduct(productId: string) {
    const concreteProductPath = `/${AppPathsEnum.ConcreteProduct}/${productId}`
    this.redirect(concreteProductPath)
  }

  redirectCreateProduct() {
    const path = `/${AppPathsEnum.CreateProduct}`
    this.redirect(path)
  }

  redirectToChats() {
    const path = this.appLinks.getLinkToChats()
    this.redirect(path)
  }

  redirectToConcreteChat(chatId: string) {
    const path = `/${AppPathsEnum.ConcreteChat}/${chatId}`
    this.redirect(path)
  }

  redirectHome() {
    this.redirect("/")
  }

  private redirect(path: string) {
    this.router.navigate([path])
  }
}
