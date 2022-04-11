import { NgModule } from "@angular/core"
import { ChatsModule } from "./chats/chats.module"
import { ChatMessagesModule } from "./messages/messages.module"

@NgModule({
  imports: [ChatMessagesModule, ChatsModule]
})
export class ChatFeatureModule {}
