import { Injectable } from "@angular/core"
import { io, Socket } from "socket.io-client"
import { environment } from "src/environments/environment"
import { AccessTokenLocalStorageService } from "../local-storage/access-token.service"

@Injectable({
  providedIn: "root"
})
export class WebsocketsService {
  private accessTokenStorage = new AccessTokenLocalStorageService()

  private socket?: Socket

  constructor() {}

  getSocket(): Socket {
    const socket = this.socket

    if (socket) {
      return socket
    }

    this.socket = this.createSocket()
    return this.socket
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
