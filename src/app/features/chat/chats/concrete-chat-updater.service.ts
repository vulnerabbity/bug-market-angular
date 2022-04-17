import { Injectable } from "@angular/core"
import { WebsocketsService } from "../../websockets/ws.service"

@Injectable({ providedIn: "root" })
export class ConcreteChatsUpdaterService {
  private socket = this.ws.getSocket()

  constructor(private ws: WebsocketsService) {}

  viewMessages(chatId: string) {
    console.log("viewed")
    this.socket.emit("markChatViewed", { chatId })
  }
}
