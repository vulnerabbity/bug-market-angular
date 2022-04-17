import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { ChatMessage } from "src/generated-gql-types"
import { CurrentChatState } from "../chats/concrete/current-chat.state"
import { ExtendedChat } from "../chats/many/chat.interface"
import { MessagesLoader } from "./messages-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatMessagesState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  messages$ = new BehaviorSubject<ChatMessage[]>([])

  constructor(private messagesLoader: MessagesLoader, private currentChatState: CurrentChatState) {
    this.subscribeToChat()
    this.subscribeToMessages()
  }

  init(chatId: string) {
    this.initMessages(chatId)
  }

  private async initMessages(chatId: string) {
    const { data: paginatedMessages } = await this.messagesLoader.getMessagesResponse(chatId)
    const { data: messages } = paginatedMessages!

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
