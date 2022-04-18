import { Injectable } from "@angular/core"
import { Socket } from "socket.io-client"
import { WebsocketsService } from "../../websockets/ws.service"
import { ChatEvents } from "./chat.events"

@Injectable({
  providedIn: "root"
})
export class ChatNotificationsService {
  constructor(private chatEvents: ChatEvents, private ws: WebsocketsService) {}

  private socket!: Socket

  private messageReceivedEvent = "messageReceived"
  private messageUpdatedEvent = "messageUpdated"

  async listen() {
    this.socket = this.ws.getSocket()

    this.socket.emit("listenToChatsNotifications")

    this.listenToMessageReceived()
    this.listenToMessageUpdated()
  }

  stopListening() {
    this.socket.off(this.messageReceivedEvent)
    this.socket.off(this.messageUpdatedEvent)
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
}
