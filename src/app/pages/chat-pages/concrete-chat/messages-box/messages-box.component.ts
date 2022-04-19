import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core"
import { MessageTypeService } from "src/app/features/chat/messages/message-type.service"
import { CurrentChatMessagesState } from "src/app/features/chat/messages/messages.state"
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

  private isScrolledToBottom = false

  private messagesSubscription = this.messagesState.messages$.subscribe(messages => {
    this.messages = messages
  })

  constructor(
    private messagesState: CurrentChatMessagesState,
    private messageTypeService: MessageTypeService
  ) {}

  ngAfterViewChecked(): void {
    if (this.isScrolledToBottom === false) {
      const height = this.getScrollTotalHeight()
      this.scrollBottom(height)
    }
  }

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

  private getScrollTotalHeight(): number {
    return this.scrollContainer?.nativeElement.scrollHeight ?? 0
  }

  private isIncomingMessage(message: ChatMessage): boolean {
    return this.messageTypeService.isIncomingMessage(message)
  }

  private scrollBottom(height: number) {
    if (height > 0) {
      this.isScrolledToBottom = true
      console.log("scroll bottom")
      this.scrollContainer.nativeElement.scroll({
        top: height
      })
    }
  }
}
