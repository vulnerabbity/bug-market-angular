import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { ChatMessage } from "src/generated-gql-types"
import { ExtendedChat } from "../chats/chat.interface"

@Injectable({ providedIn: "root" })
export class ChatEvents {
  messageReceived$ = new Subject<ChatMessage>()
  chatOpened$ = new Subject<ExtendedChat>()
}
