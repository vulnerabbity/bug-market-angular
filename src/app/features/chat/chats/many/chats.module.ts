import { NgModule } from "@angular/core"
import { ChatsLoaderService } from "./chats-loader.service"
import { ManyChatsEventsHandler } from "./chats.events-handler"
import { ChatsState } from "./chats.state"
import { ExtendedChatsLoader } from "./extended-chats-loader.service"

@NgModule({
  providers: [ChatsLoaderService, ExtendedChatsLoader]
})
export class ManyChatsModule {
  // instantiate on module loaded
  constructor(chatsState: ChatsState, eventsHandler: ManyChatsEventsHandler) {}
}
