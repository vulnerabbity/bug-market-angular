import { Injectable } from "@angular/core"
import { io, Socket } from "socket.io-client"
import { environment } from "src/environments/environment"
import { AccessTokenLocalStorageService } from "../../local-storage/access-token.service"
import { ChatEvents } from "./chat.events"

@Injectable({
  providedIn: "root"
})
export class ChatNotificationsService {
  constructor(private chatEvents: ChatEvents) {}

  private accessTokenStorage = new AccessTokenLocalStorageService()

  private socket!: Socket

  async listen() {
    this.socket = this.createSocket()

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

  private createSocket() {
    return io(environment.websocketsUrl, {
      extraHeaders: this.getSocketHeaders()
    })
  }

  private getSocketHeaders() {
    const accessToken = `bearer ${this.accessTokenStorage.tryToGetRecord()}`
    return { Authorization: accessToken }
  }
}
