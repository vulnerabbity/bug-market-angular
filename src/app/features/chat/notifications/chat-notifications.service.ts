import { Injectable } from "@angular/core"
import { Socket } from "socket.io-client"
import { Chat } from "src/generated-gql-types"
import { WebsocketsService } from "../../websockets/ws.service"
import { ChatMessagesNumberLoader } from "../messages/messages-number-loader"
import { ChatEvents } from "./chat.events"

export interface ConcreteChatNotViewedChangedResponse {
  number: number
  chatId: string
}

@Injectable({
  providedIn: "root"
})
export class ChatNotificationsService {
  constructor(
    private chatEvents: ChatEvents,
    private ws: WebsocketsService,
    private messagesNumbersLoader: ChatMessagesNumberLoader
  ) {}

  private socket!: Socket

  private messageReceivedEvent = "messageReceived"
  private messageUpdatedEvent = "messageUpdated"
  private totalNotViewedMessagesChangedEvent = "totalNotViewedMessagesChanged"
  private concreteChatNotViewedMessagesChangedEvent = "concreteChatNotViewedMessagesChanged"

  private chatCreatedEvent = "chatCreated"
  private chatDeletedEvent = "chatDeleted"

  async listen() {
    this.socket = this.ws.getSocket()

    this.socket.emit("listenToChatsNotifications")

    this.listenToMessageReceived()
    this.listenToMessageUpdated()
    this.listenToTotalNotViewedMessages()
    this.listenToNotViewedMessagesPerChat()

    this.listenToChatCreated()
    this.listenToChatDeleted()
  }

  stopListening() {
    const events = this.getAllEvents()
    events.forEach(event => this.socket.off(event))
  }

  private listenToMessageReceived() {
    this.socket.on(this.messageReceivedEvent, message => {
      this.chatEvents.messageReceived$.next(message)
    })
  }

  private listenToMessageUpdated() {
    this.socket.on(this.messageUpdatedEvent, message => {
      this.chatEvents.messageUpdated$.next(message)
    })
  }

  private listenToTotalNotViewedMessages() {
    this.initTotalNotViewedMessages()
    this.socket.on(this.totalNotViewedMessagesChangedEvent, (number: number) => {
      this.chatEvents.notViewedMessagesTotalChanged$.next(number)
    })
  }

  private listenToNotViewedMessagesPerChat() {
    this.socket.on(
      this.concreteChatNotViewedMessagesChangedEvent,
      (response: ConcreteChatNotViewedChangedResponse) => {
        this.chatEvents.concreteChatNotViewedMessagesChanged$.next(response)
      }
    )
  }

  private listenToChatCreated() {
    this.socket.on(this.chatCreatedEvent, (chat: Chat) => {
      this.chatEvents.chatCreated$.next(chat)
    })
  }

  private listenToChatDeleted() {
    this.socket.on(this.chatDeletedEvent, (chat: Chat) => {
      this.chatEvents.chatDeleted$.next(chat)
    })
  }
  private async initTotalNotViewedMessages() {
    const number = await this.messagesNumbersLoader.getTotal()
    this.chatEvents.notViewedMessagesTotalChanged$.next(number)
  }

  private getAllEvents(): string[] {
    const events: string[] = [
      this.messageReceivedEvent,
      this.messageUpdatedEvent,
      this.totalNotViewedMessagesChangedEvent,
      this.concreteChatNotViewedMessagesChangedEvent,
      this.chatCreatedEvent,
      this.chatDeletedEvent
    ]

    return events
  }
}
