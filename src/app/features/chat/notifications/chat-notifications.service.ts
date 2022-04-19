import { Injectable } from "@angular/core"
import { Socket } from "socket.io-client"
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

  async listen() {
    this.socket = this.ws.getSocket()

    this.socket.emit("listenToChatsNotifications")

    this.listenToMessageReceived()
    this.listenToMessageUpdated()
    this.listenToTotalNotViewedMessages()
    this.listenToNotViewedMessagesPerChat()
  }

  stopListening() {
    this.socket.off(this.messageReceivedEvent)
    this.socket.off(this.messageUpdatedEvent)
    this.socket.off(this.totalNotViewedMessagesChangedEvent)
    this.socket.off(this.concreteChatNotViewedMessagesChangedEvent)
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

  private async initTotalNotViewedMessages() {
    const number = await this.messagesNumbersLoader.getTotal()
    this.chatEvents.notViewedMessagesTotalChanged$.next(number)
  }
}
