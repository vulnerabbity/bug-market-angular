import { Component } from "@angular/core"
import { CommonDialogsService } from "src/app/common/components/dialogs/dialogs.service"
import { CurrentChatState } from "src/app/features/chat/chats/concrete/current-chat.state"

@Component({
  selector: "concrete-chat-page__top-navbar-menu",
  templateUrl: "./top-navbar-menu.component.html",
  styleUrls: ["./top-navbar-menu.component.scss"]
})
export class ConcreteChatPageTopNavbarMenuComponent {
  constructor(private chatState: CurrentChatState, private dialogs: CommonDialogsService) {}
  async onDeleteClick() {
    const needDelete = await this.showDialog()

    if (needDelete) {
      await this.delete()
    }
  }

  private async delete() {
    return await this.chatState.delete()
  }

  private async showDialog(): Promise<boolean> {
    return await this.dialogs.showConfirmDialog({
      message: "Delete chat?",
      hint: "You will lost all your messages"
    })
  }
}
