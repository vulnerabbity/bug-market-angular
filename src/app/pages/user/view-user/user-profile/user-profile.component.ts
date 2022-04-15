import { Component, Input, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { map, Observable } from "rxjs"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"
import { UserAbilities } from "src/app/features/users/users-abilities.service"
import { assetsPaths } from "src/assets/assets.paths"
import { User } from "src/app/features/users/users.interface"
import { userDefaults } from "src/app/features/users/user.defaults"

interface KeyValue {
  key: string
  value: string
}

@Component({
  selector: "view-user-page__profile[user]",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent {
  @Input()
  user!: User

  constructor(private userAbilities: UserAbilities) {}

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

  isUpdateAllowed() {
    return this.userAbilities.canUpdate(this.user)
  }
}
