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

  async listen() {
    this.socket = this.ws.getSocket()

    this.socket.emit("listenToChatsNotifications")

    this.receiveMessages()
  }

  stopListening() {
    this.socket?.close()
  }

  private receiveMessages() {
    this.socket.on("messageReceived", message => {
      this.chatEvents.messageReceived$.next(message)
    })
  }
}
