import { Injectable } from "@angular/core"
import { makeDeepCopy } from "src/app/common/services/deepcopy.service"
import { ChatMessage } from "src/generated-gql-types"
import { ChatEvents } from "../notifications/chat.events"
import { CurrentChatMessagesState } from "./messages.state"

@Injectable({ providedIn: "root" })
export class MessagesEventHandler {
  constructor(private messagesState: CurrentChatMessagesState, private chatEvents: ChatEvents) {
    this.startHandling()
  }

  private startHandling() {
    this.handleReceiveMessage()
  }

  private handleReceiveMessage() {
    this.chatEvents.messageReceived$.subscribe(newMessage => {
      this.addMessageToState(newMessage)
    })
  }

  private addMessageToState(newMessage: ChatMessage) {
    const isMessageForThisChat = this.messagesState.chat?.id === newMessage.chatId
    if (isMessageForThisChat === false) {
      return
    }
    const messages = makeDeepCopy(this.messagesState.messages)
    messages.unshift(newMessage)

    this.messagesState.messages$.next(messages)
  }
}
