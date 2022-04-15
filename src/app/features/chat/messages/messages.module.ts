import { NgModule } from "@angular/core"
import { MessageTypeService } from "./message-type.service"
import { MessagesLoader } from "./messages-loader.service"
import { MessagesSenderService } from "./messages-sender.service"
import { CurrentChatMessagesState } from "./messages.state"

@NgModule({
  providers: [MessagesLoader, MessagesSenderService, MessageTypeService, CurrentChatMessagesState]
})
export class ChatMessagesModule {}
