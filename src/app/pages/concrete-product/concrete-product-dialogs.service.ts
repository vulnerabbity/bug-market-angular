import { Injectable } from "@angular/core"
import { CommonDialogsService } from "src/app/common/components/dialogs/dialogs.service"

@Injectable({
  providedIn: "root"
})
export class ConcreteProductDialogsService {
  constructor(private commonDialogs: CommonDialogsService) {}

  async showConfirmDeleteProduct(productName: string) {
    const message = "You sure you want delete this product?"
    const hint = `Product "${productName}" will be deleted permanently!`

    return this.commonDialogs.showConfirmDialog({ message, hint })
  }
}
