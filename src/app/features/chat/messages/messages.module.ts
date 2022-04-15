import { NgModule } from "@angular/core"
import { MessageTypeService } from "./message-type.service"
import { MessagesLoader } from "./messages-loader.service"
import { MessagesSenderService } from "./messages-sender.service"

@NgModule({
  providers: [MessagesLoader, MessagesSenderService, MessageTypeService]
})
export class ChatMessagesModule {}
