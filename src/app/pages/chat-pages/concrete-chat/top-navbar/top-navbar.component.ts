import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core"
import { AppLinksService } from "src/app/common/services/links.service"
import { AppRouterService } from "src/app/common/services/router.service"
import { CurrentChatState } from "src/app/features/chat/chats/concrete/current-chat.state"
import { ExtendedChat } from "src/app/features/chat/chats/many/chat.interface"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "concrete-chat__top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.scss"]
})
export class TopNavbarComponent implements OnDestroy {
  chat: ExtendedChat | null = null

  chatSubscription = this.chatState.chat$.subscribe(chat => (this.chat = chat))

  constructor(
    private chatState: CurrentChatState,
    private appRouter: AppRouterService,
    private appLinks: AppLinksService,
    private currentUserState: CurrentUserState
  ) {}

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe()
  }

  getChatImage() {
    const chatImage = this.chat?.chatImage ?? assetsPaths.NoAvatar

    return chatImage
  }

  getLinkToOtherUser(): string {
    const currentUser = this.currentUserState.item
    const peersIds = this.chat?.peersIds

    const cantGetLink = !currentUser || !peersIds
    if (cantGetLink) {
      return ""
    }

    const otherUserId = peersIds.find(peerId => peerId !== currentUser.id)
    if (!otherUserId) {
      return ""
    }

    return this.appLinks.getLinkToUser(otherUserId)
  }

  onBackClick() {
    this.chatState.quit()
    this.appRouter.redirectToChats()
  }
}
