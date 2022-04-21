import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { MessageTypeService } from "src/app/features/chat/messages/message-type.service"
import { CurrentChatMessagesState } from "src/app/features/chat/messages/messages.state"
import { ChatMessage } from "src/generated-gql-types"

export type MessageClass = "message__incoming" | "message__outgoing"

@Component({
  selector: "concrete-chat__messages-box",
  templateUrl: "./messages-box.component.html",
  styleUrls: ["./messages-box.component.scss"]
})
export class MessagesBoxComponent implements OnDestroy {
  @ViewChild("scrollContainer")
  scrollContainer!: ElementRef

  messages: ChatMessage[] = []

  private isScrolled = false

  private messagesSubscription = this.messagesState.messages$.subscribe(messages => {
    this.messages = messages

    const needScroll = this.isScrolled === false && messages.length > 0
    console.log(messages.length)
    if (needScroll) {
      setTimeout(() => {
        this.scrollEnd()
        this.isScrolled = true
      })
    }
  })

  constructor(
    private messagesState: CurrentChatMessagesState,
    private messageTypeService: MessageTypeService
  ) {}

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe()
  }

  async loadMore() {
    await this.messagesState.loadMore()

    // preventing sticking scrollbar to the end of scroll container
    this.scrollBottom(1)
  }

  getMessageClass(message: ChatMessage): MessageClass {
    const isIncoming = this.isIncomingMessage(message)
    return isIncoming ? "message__incoming" : "message__outgoing"
  }

  getMessageColor(message: ChatMessage) {
    const isIncoming = this.isIncomingMessage(message)
    return isIncoming ? "accent" : "primary"
  }

  isLast(messageIdex: number) {
    const lastIndex = this.messages.length - 1
    const result = messageIdex === lastIndex

    return result
  }

  scrollEnd() {
    this.scrollEndForce()
  }

  private scrollEndForce() {
    this.scrollBottom(9999)
  }

  private isIncomingMessage(message: ChatMessage): boolean {
    return this.messageTypeService.isIncomingMessage(message)
  }

  private scrollBottom(height: number) {
    this.scrollContainer.nativeElement.scrollTop = height
  }
}
