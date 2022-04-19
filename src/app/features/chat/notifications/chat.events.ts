import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { ChatMessage } from "src/generated-gql-types"
import { ExtendedChat } from "../chats/many/chat.interface"

@Injectable({ providedIn: "root" })
export class ChatEvents {
  messageReceived$ = new Subject<ChatMessage>()
  messageUpdated$ = new Subject<ChatMessage>()
  notViewedMessagesTotalChanged$ = new BehaviorSubject<number>(0)

  chatOpened$ = new Subject<ExtendedChat>()
}
