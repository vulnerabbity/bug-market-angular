import { NgModule } from "@angular/core"
import { MessagesLoader } from "./messages-loader.service"
import { MessagesSenderService } from "./messages-sender.service"

@NgModule({
  providers: [MessagesLoader, MessagesSenderService]
})
export class ChatMessagesModule {}
