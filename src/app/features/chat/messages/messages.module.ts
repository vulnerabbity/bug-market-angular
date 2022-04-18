import { NgModule } from "@angular/core"
import { MessageTypeService } from "./message-type.service"
import { MessagesLoader } from "./messages-loader.service"
import { MessagesSenderService } from "./messages-sender.service"
import { MessagesEventHandler } from "./messages.events-handler"
import { CurrentChatMessagesState } from "./messages.state"

@NgModule({
  providers: [MessagesLoader, MessagesSenderService, MessageTypeService]
})
export class ChatMessagesModule {
  // instantiate on module loaded
  constructor(
    private messagesEventsHandler: MessagesEventHandler,
    private messagesState: CurrentChatMessagesState
  ) {}
}
