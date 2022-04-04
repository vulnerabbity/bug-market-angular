import { Component, Input, OnInit } from "@angular/core"
import { Product } from "src/app/features/products/products.interface"
import { User } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"
import { userDefaults } from "src/app/features/users/user.defaults"
import { firstValueFrom } from "rxjs"

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

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    this.loading = true
    this.user = await this.loadUser(this.product.userId)
    this.loading = false
  }

  private async loadUser(id: string): Promise<User> {
    return firstValueFrom(this.usersService.loadUser({ id }))
  }
}