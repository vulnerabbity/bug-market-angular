import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { LocalUserService } from "src/app/features/users/local-user.service"

@Component({
  selector: "common-go-to-chats-menu-link",
  styleUrls: ["./menu.styles.scss"],
  template: `
    <a [routerLink]="linkToChats" class="menu-item" mat-menu-item>
      <mat-icon>chat</mat-icon><span>My chats</span>
    </a>
  `
})
export class CommonGoToChatsMenuLinkComponent {
  linkToChats = `/${AppPathsEnum.ChatsList}`
}
