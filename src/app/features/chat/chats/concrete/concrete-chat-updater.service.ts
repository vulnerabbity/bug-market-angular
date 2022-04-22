import { Injectable } from "@angular/core"
import { WebsocketsService } from "src/app/features/websockets/ws.service"

@Injectable({ providedIn: "root" })
export class ConcreteChatsUpdaterService {
  private socket = this.ws.getSocket()

  constructor(private ws: WebsocketsService) {}

  viewMessages(chatId: string) {
    this.socket.emit("markChatViewed", { chatId })
  }
}
