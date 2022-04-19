import { Injectable } from "@angular/core"
import { WebsocketsService } from "../../websockets/ws.service"

export interface SendChatMessageInput {
  text: string
  userId: string
}

@Injectable({ providedIn: "root" })
export class MessagesSenderService {
  private socket = this.ws.getSocket()

  constructor(private ws: WebsocketsService) {}

  async sendMessage(input: SendChatMessageInput) {
    this.socket.emit("sendMessage", input)
  }
}
