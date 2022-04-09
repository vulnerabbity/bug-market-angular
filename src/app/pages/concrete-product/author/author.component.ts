import { Component, Input, OnInit } from "@angular/core"
import { Product } from "src/app/features/products/products.interface"
import { User } from "src/app/features/users/users.interface"
import { userDefaults } from "src/app/features/users/user.defaults"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"

@Component({
  selector: "concrete-product-page-author[product]",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.scss"]
})
export class ConcreteProductPageAuthorComponent implements OnInit {
  @Input()
  product!: Product

  user!: User

  loading = false

  get userNameOrDefault(): string {
    if (this.user.name) {
      return this.user.name
    }
    return userDefaults.name
  }

  constructor(private usersLoader: UsersLoaderService) {}

  async ngOnInit() {
    this.loading = true
    this.user = await this.loadUser(this.product.userId)
    this.loading = false
  }

  private async loadUser(id: string): Promise<User> {
    return await this.usersLoader.loadUser({ id })
  }
}
