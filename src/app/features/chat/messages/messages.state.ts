import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { makeDeepCopy } from "src/app/common/services/deepcopy.service"
import { ChatMessage } from "src/generated-gql-types"
import { CurrentChatState } from "../chats/concrete/current-chat.state"
import { ExtendedChat } from "../chats/many/chat.interface"
import { ChatEvents } from "../notifications/chat.events"
import { MessagesLoader } from "./messages-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatMessagesState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  messages$ = new BehaviorSubject<ChatMessage[]>([])

  messageSended$ = new Subject<void>()

  constructor(
    private messagesLoader: MessagesLoader,
    private currentChatState: CurrentChatState,
    private chatEvents: ChatEvents
  ) {
    this.subscribeToChat()
    this.subscribeToMessages()
    this.handleReceiveMessage()
  }

  init(chatId: string) {
    this.initMessages(chatId)
  }

  private async initMessages(chatId: string) {
    const { data: paginatedMessages } = await this.messagesLoader.getMessagesResponse(chatId)
    const { data: messages } = paginatedMessages!

    this.messages$.next(messages)
  }

  private handleReceiveMessage() {
    this.chatEvents.messageReceived$.subscribe(newMessage => {
      this.addMessage(newMessage)
    })
  }

  private addMessage(newMessage: ChatMessage) {
    const isMessageForThisChat = this.chat?.id === newMessage.chatId
    if (isMessageForThisChat === false) {
      return
    }
    const messages = makeDeepCopy(this.messages)
    messages.unshift(newMessage)

    this.messages$.next(messages)
  }

  private subscribeToChat() {
    return this.currentChatState.chat$.subscribe(chat => {
      this.chat = chat
      if (chat) {
        this.init(chat.id)
      }
    })
  }

  private subscribeToMessages() {
    return this.messages$.subscribe(messages => {
      this.messages = messages
    })
  }
}
