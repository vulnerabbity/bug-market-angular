import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { LocalUserService } from "src/app/features/users/local-user.service"

@Component({
  selector: "common-go-to-profile-menu-link",
  styleUrls: ["./menu.styles.scss"],
  template: `
    <a [routerLink]="this.linkToProfileOrNull" class="menu-item" mat-menu-item>
      <mat-icon>face</mat-icon><span>My profile</span>
    </a>
  `
})
export class CommonGoToProfileMenuLinkComponent {
  constructor(private localUser: LocalUserService) {}

  get linkToProfileOrNull(): string | null {
    const userId = this.localUser.getUserIdOrNull()
    if (userId) {
      return `/${AppPathsEnum.UserPage}/${userId}`
    }
    return null
  }
}
