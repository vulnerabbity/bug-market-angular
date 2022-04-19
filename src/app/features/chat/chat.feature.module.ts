import { NgModule } from "@angular/core"
import { WebsocketsModule } from "../websockets/ws.module"
import { ConcreteChatModule } from "./chats/concrete/concrete-chat.module"
import { ManyChatsModule } from "./chats/many/chats.module"
import { ChatMessagesModule } from "./messages/messages.module"
import { ChatsNotificationsModule } from "./notifications/notifications.module"

@NgModule({
  imports: [
    ChatMessagesModule,
    ManyChatsModule,
    ConcreteChatModule,
    ChatsNotificationsModule,
    WebsocketsModule
  ]
})
export class ChatFeatureModule {}
