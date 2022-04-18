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
    this.handleUpdateMessage()
  }

  private handleReceiveMessage() {
    this.chatEvents.messageReceived$.subscribe(newMessage => {
      this.addMessageToState(newMessage)
    })
  }

  private handleUpdateMessage() {
    this.chatEvents.messageUpdated$.subscribe(updatedMessage => {
      this.updateMessageIfInCurrentChat(updatedMessage)
    })
  }

  private updateMessageIfInCurrentChat(updatedMessage: ChatMessage) {
    const messages = this.messagesState.messages
    const messageIndex = this.findMessageIndexOrNull(messages, updatedMessage.id)

    if (messageIndex !== null) {
      return this.replaceMessageInStateAt(updatedMessage, messageIndex)
    }
  }

  private replaceMessageInStateAt(message: ChatMessage, atIndex: number) {
    const messages = this.messagesState.messages
    const lastMessagesIndex = messages.length - 1

    const isOutOfRange = atIndex < 0 || atIndex > lastMessagesIndex
    if (isOutOfRange) {
      return
    }

    messages[atIndex] = message
    this.messagesState.messages$.next(messages)
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

  private findMessageIndexOrNull(messages: ChatMessage[], idToSearch: string): number | null {
    const messageIndex = messages.findIndex(message => message.id === idToSearch)
    const notFoundIndex = -1

    if (messageIndex === notFoundIndex) {
      return null
    }

    return messageIndex
  }
}
