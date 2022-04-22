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

  private isInitiallyScrolled = false

  private messagesSubscription = this.messagesState.messages$.subscribe(messages => {
    // scroll at new messages
    if (this.isScrollAtBottom()) {
      setTimeout(() => this.scrollEnd())
    }

    this.messages = messages

    const hasMessages = messages.length > 0
    const notInitiallyScrolled = this.isInitiallyScrolled === false
    const needScrollInitially = notInitiallyScrolled && hasMessages
    if (needScrollInitially) {
      setTimeout(() => {
        this.scrollEnd()
        this.isInitiallyScrolled = true
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
    this.scrollBottom(9999)
  }

  private isScrollAtBottom() {
    const scrollFromBottom = this.getScrollPositionRelativeBottom()
    return scrollFromBottom <= 0
  }

  private getScrollPositionRelativeBottom() {
    const positionRelativeTop = this.scrollContainer?.nativeElement.scrollTop ?? 0
    const height = this.scrollContainer?.nativeElement.scrollHeight ?? 0
    const viewHeight = this.scrollContainer?.nativeElement.offsetHeight ?? 0

    const position = height - positionRelativeTop - viewHeight
    return position
  }

  private isIncomingMessage(message: ChatMessage): boolean {
    return this.messageTypeService.isIncomingMessage(message)
  }

  private scrollBottom(height: number) {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = height
    }
  }
}
