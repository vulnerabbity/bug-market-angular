import { Injectable } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Injectable()
export class AppLinksService {
  getLinkToUser(userId: string) {
    return `/${AppPathsEnum.UserPage}/${userId}`
  }

  getLinkToChats() {
    return `/${AppPathsEnum.ChatsList}`
  }

  getLinkToProduct(productId: string) {
    return `/${AppPathsEnum.ConcreteProduct}/${productId}`
  }

  getLinkToProducts() {
    return `/${AppPathsEnum.Products}`
  }
}
