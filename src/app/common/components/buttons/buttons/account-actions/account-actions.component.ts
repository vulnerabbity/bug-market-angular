import { Component, OnInit } from "@angular/core"
import { LocalUserService } from "src/app/features/users/local-user.service"
import { User } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "common-manage-account-button",
  templateUrl: "./account-actions.component.html",
  styleUrls: ["./account-actions.component.scss"]
})
export class CommonManageAccountButtonComponent implements OnInit {
  private user?: User
  private userId: string | null = this.localUser.getUserIdOrNull()

  constructor(private userService: UsersService, private localUser: LocalUserService) {}

  ngOnInit(): void {
    this.loadUserIfAuthenticated()
  }

  onLogoutClick() {
    this.onLogout()
  }

  getAvatarSource(): string {
    const hasUser = !!this.user
    const defaultAvatar = assetsPaths.NoAvatar
    if (hasUser) {
      return this.user?.avatarUrl ?? defaultAvatar
    }
    return defaultAvatar
  }

  private onLogout() {
    this.user = undefined
  }

  private loadUserIfAuthenticated() {
    if (!this.userId) {
      return
    }
    this.userService.loadUser({ id: this.userId }).subscribe(user => {
      this.user = user
    })
  }
}
