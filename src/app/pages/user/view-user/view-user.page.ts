import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { map, Observable } from "rxjs"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"
import { UserWithShortProducts } from "src/app/features/users/users.interface"
import { userDefaults } from "src/app/features/users/user.defaults"

@Component({
  templateUrl: "./view-user.page.html",
  styleUrls: ["./view-user.page.scss"]
})
export class ViewUserPage implements OnInit {
  isLoaded = false

  user!: UserWithShortProducts

  get loaderSpinnerSize() {
    const halfOfWindowWidth = window.innerWidth / 2
    return Math.min(600, halfOfWindowWidth)
  }

  private userId$: Observable<string> = this.currentRoute.params.pipe(map(params => params["id"]))

  constructor(private currentRoute: ActivatedRoute, private usersLoader: UsersLoaderService) {}

  ngOnInit(): void {
    this.userId$.subscribe(userId => {
      this.loadUser(userId)
    })
  }

  get userNameOrDefault(): string {
    if (this.user.name) {
      return this.user.name
    }

    return userDefaults.name
  }

  private async loadUser(id: string) {
    const loadedUser = await this.usersLoader.loadUserWithProductsOrRedirect({ id })
    this.user = loadedUser
    this.isLoaded = true
  }
}
