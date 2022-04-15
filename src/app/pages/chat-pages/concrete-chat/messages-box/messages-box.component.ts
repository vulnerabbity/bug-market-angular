import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { CurrentChatState } from "src/app/features/chat/current-chat.state"
import { MessageTypeService } from "src/app/features/chat/messages/message-type.service"
import { ChatMessage } from "src/generated-gql-types"

export type MessageClass = "message__incoming" | "message__outgoing"

@Component({
  selector: "concrete-chat__messages-box",
  templateUrl: "./messages-box.component.html",
  styleUrls: ["./messages-box.component.scss"]
})
export class MessagesBoxComponent implements OnDestroy, AfterViewChecked {
  @ViewChild("scrollContainer")
  scrollContainer!: ElementRef

  messages: ChatMessage[] = []

  messagesSubscription = this.chatState.messages$.subscribe(messages => {
    this.messages = messages
  })

  constructor(
    private chatState: CurrentChatState,
    private messageTypeService: MessageTypeService
  ) {}

  ngAfterViewChecked(): void {
    this.scrollBottom()
  }

  getMessageClass(message: ChatMessage): MessageClass {
    const isIncoming = this.isIncomingMessage(message)
    return isIncoming ? "message__incoming" : "message__outgoing"
  }

  getMessageColor(message: ChatMessage) {
    const isIncoming = this.isIncomingMessage(message)
    return isIncoming ? "accent" : "primary"
  }

  private isIncomingMessage(message: ChatMessage): boolean {
    return this.messageTypeService.isIncomingMessage(message)
  }

  private scrollBottom() {
    const height = this.scrollContainer.nativeElement.scrollHeight
    this.scrollContainer.nativeElement.scroll({
      top: height
    })
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe()
  }
}
