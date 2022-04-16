import { NgModule } from "@angular/core"
import { ChatsModule } from "./chats/chats.module"
import { ChatMessagesModule } from "./messages/messages.module"
import { ChatsNotificationsModule } from "./notifications/notifications.module"

@NgModule({
  imports: [ChatMessagesModule, ChatsModule, ChatsNotificationsModule]
})
export class ChatFeatureModule {}
