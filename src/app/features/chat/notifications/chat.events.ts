import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { ChatMessage } from "src/generated-gql-types"

@Injectable({ providedIn: "root" })
export class ChatEvents {
  messageReceived$ = new Subject<ChatMessage>()
}
