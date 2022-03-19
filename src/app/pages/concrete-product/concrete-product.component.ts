import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { map, Observable, take } from "rxjs"
import { ProductsService } from "src/app/features/products/products.service"
import { Product } from "src/generated-gql-types"

@Component({
  templateUrl: "./concrete-product.component.html"
})
export class ConcreteProductPageComponent implements OnInit {
  product!: Product
  loaded = false

  constructor(private productsService: ProductsService, private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.parseProductIdFromUrl.subscribe(id => this.loadProduct(id))
  }

  private parseProductIdFromUrl: Observable<string> = this.currentRoute.params.pipe(
    map(params => params["id"]),
    take(1)
  )

  private loadProduct(id: string): void {
    this.productsService.loadFullProduct(id).subscribe(product => {
      this.product = product
      this.loaded = true
    })
  }
}
