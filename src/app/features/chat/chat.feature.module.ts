import { NgModule } from "@angular/core"
import { WebsocketsModule } from "../websockets/ws.module"
import { ChatsModule } from "./chats/chats.module"
import { ChatMessagesModule } from "./messages/messages.module"
import { ChatsNotificationsModule } from "./notifications/notifications.module"

@NgModule({
  imports: [ChatMessagesModule, ChatsModule, ChatsNotificationsModule, WebsocketsModule]
})
export class ChatFeatureModule {}
