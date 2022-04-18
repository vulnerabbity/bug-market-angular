import { Component, OnDestroy, OnInit } from "@angular/core"
import { CurrentChatState } from "src/app/features/chat/chats/concrete/current-chat.state"
import { MessagesSenderService } from "src/app/features/chat/messages/messages-sender.service"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { User } from "src/app/features/users/users.interface"
import { Chat } from "src/generated-gql-types"

@Component({
  selector: "concrete-chat__bottom-navbar",
  templateUrl: "./bottom-navbar.component.html",
  styleUrls: ["./bottom-navbar.component.scss"]
})
export class BottomNavbarComponent implements OnDestroy {
  messageInputText: string = ""

  currentChat: Chat | null = null
  currentUser: User | null = null

  currentChatSub = this.chatState.chat$.subscribe(chat => (this.currentChat = chat))
  currentUserSub = this.userState.item$.subscribe(user => (this.currentUser = user))

  constructor(
    private chatState: CurrentChatState,
    private userState: CurrentUserState,
    private messagesSender: MessagesSenderService
  ) {}

  ngOnDestroy(): void {
    this.currentChatSub.unsubscribe()
    this.currentUserSub.unsubscribe()
  }

  onSendMessage() {
    if (this.cantSendMessage()) {
      return
    }
    this.sendMessage()
    this.clearMessage()
  }

  cantSendMessage(): boolean {
    return this.isEmptyMessage()
  }

  private async sendMessage() {
    const chat = this.currentChat!
    const currentUser = this.currentUser!

    const receiverId = chat.peersIds.filter(peerId => peerId !== currentUser.id)[0]
    await this.messagesSender.sendMessage({
      text: this.messageInputText,
      userId: receiverId
    })
  }

  private clearMessage() {
    this.messageInputText = ""
  }

  private isEmptyMessage() {
    const message = this.messageInputText.trim()
    return message.length === 0
  }
}
