import { Injectable } from "@angular/core"
import { AuthorizationService } from "../authorization/authorization.service"
import { Product } from "./products.interface"

@Injectable({
  providedIn: "root"
})
export class ProductAbilities {
  constructor(private authorizationService: AuthorizationService) {}

  canDeleteProduct(product: Product): boolean {
    product = this.covertToCaslCompatible(product)

    return this.authorizationService.isAllowed("delete", product)
  }

  /**
   * Casl will ignore product instance without converting
   */
  covertToCaslCompatible(product: Product): Product {
    const caslProduct = new Product()
    Object.assign(caslProduct, product)
    return caslProduct
  }
}
