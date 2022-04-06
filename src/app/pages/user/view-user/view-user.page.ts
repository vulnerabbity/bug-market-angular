import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { map, Observable } from "rxjs"
import { userDefaults } from "src/app/features/users/user.defaults"
import { UserAbilities } from "src/app/features/users/users-abilities.service"
import { UserWithShortProducts } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"
import { assetsPaths } from "src/assets/assets.paths"

interface KeyValue {
  key: string
  value: string
}

@Component({
  templateUrl: "./view-user.page.html",
  styleUrls: ["./view-user.page.scss"]
})
export class ViewUserPage implements OnInit {
  isLoaded = false

  user!: UserWithShortProducts

  get avatarUrlOrDefault(): string {
    if (this.user.avatarUrl) {
      return this.user.avatarUrl
    }
    return assetsPaths.NoAvatar
  }

  get userNameOrDefault(): string {
    if (this.user.name) {
      return this.user.name
    }

    return userDefaults.name
  }

  get keyValueProperties(): KeyValue[] {
    const propertiesToDisplay: KeyValue[] = []

    propertiesToDisplay.push({ key: "Name:", value: this.userNameOrDefault })

    return propertiesToDisplay
  }

  get loaderSpinnerSize() {
    const halfOfWindowWidth = window.innerWidth / 2
    return Math.min(600, halfOfWindowWidth)
  }

  private userId$: Observable<string> = this.currentRoute.params.pipe(map(params => params["id"]))

  constructor(
    private currentRoute: ActivatedRoute,
    private usersService: UsersService,
    private userAbilities: UserAbilities
  ) {}

  isUpdateAllowed() {
    return this.userAbilities.canUpdate(this.user)
  }

  ngOnInit(): void {
    this.userId$.subscribe(userId => {
      this.loadUser(userId)
    })
  }

  private loadUser(id: string) {
    this.usersService.loadUserWithProducts({ id }).subscribe(loadedUser => {
      this.user = loadedUser
      this.isLoaded = true
    })
  }
}
