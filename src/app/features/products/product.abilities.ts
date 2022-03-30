import { Injectable } from "@angular/core"
import { AuthorizationService } from "../authorization/authorization.service"
import { Product } from "./products.interface"

@Injectable({
  providedIn: "root"
})
export class ProductAbilities {
  constructor(private authorizationService: AuthorizationService) {}

  canDeleteProduct(product?: Product): boolean {
    if (!product) {
      return this.authorizationService.isAllowed("delete", Product)
    }
    product = this.convertToCaslCompatible(product)

    return this.authorizationService.isAllowed("delete", product)
  }

  canUpdateProduct(product?: Product): boolean {
    if (!product) {
      return this.authorizationService.isAllowed("update", Product)
    }
    product = this.convertToCaslCompatible(product)

    return this.authorizationService.isAllowed("update", product)
  }

  canCreateProduct(): boolean {
    return this.authorizationService.isAllowed("create", Product)
  }

  /**
   * Casl will ignore product instance without converting
   */
  convertToCaslCompatible(product: Product): Product {
    const caslProduct = new Product()
    Object.assign(caslProduct, product)
    return caslProduct
  }
}
