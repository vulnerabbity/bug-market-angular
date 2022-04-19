import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { MessageTypeService } from "src/app/features/chat/messages/message-type.service"
import { CurrentChatMessagesState } from "src/app/features/chat/messages/messages.state"
import { ChatMessage } from "src/generated-gql-types"

export type MessageClass = "message__incoming" | "message__outgoing"

@Component({
  selector: "concrete-chat__messages-box",
  templateUrl: "./messages-box.component.html",
  styleUrls: ["./messages-box.component.scss"]
})
export class MessagesBoxComponent implements OnDestroy, AfterViewInit {
  @ViewChild("scrollContainer")
  scrollContainer!: ElementRef

  messages: ChatMessage[] = []

  private messagesSubscription = this.messagesState.messages$.subscribe(messages => {
    this.messages = messages
  })

  constructor(
    private messagesState: CurrentChatMessagesState,
    private messageTypeService: MessageTypeService
  ) {}

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.scrollEnd()
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
    // sometimes scrolling not working for some reason
    // because of it below code makes many attempts to scroll end
    const interval = setInterval(() => {
      let containerHeight = this.getScrollTotalHeight()
      let scrollerPosition = this.getScrollerPositionRelativeBottom()

      this.scrollBottom(9999)
      const isScrolledToEnd = containerHeight > 0 && scrollerPosition === 0
      if (isScrolledToEnd) {
        clearInterval(interval)
      }
    }, 50)

    const stopAttemptsAfter = 2000
    setTimeout(() => {
      clearInterval(interval)
    }, stopAttemptsAfter)
  }

  private getScrollerPositionRelativeBottom() {
    const viewHeight = this.getViewHeight()
    const scrollContainerHeight = this.getScrollTotalHeight()
    const scrollPositionRelativeTop = this.scrollContainer.nativeElement.scrollTop

    const result = scrollContainerHeight - scrollPositionRelativeTop - viewHeight
    return result
  }

  private getViewHeight() {
    return this.scrollContainer.nativeElement.offsetHeight
  }

  private getScrollTotalHeight(): number {
    return this.scrollContainer?.nativeElement.scrollHeight ?? 0
  }

  private isIncomingMessage(message: ChatMessage): boolean {
    return this.messageTypeService.isIncomingMessage(message)
  }

  private scrollBottom(height: number) {
    this.scrollContainer.nativeElement.scrollTop = height
  }
}
