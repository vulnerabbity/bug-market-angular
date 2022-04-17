import { NgModule } from "@angular/core"
import { ChatsLoaderService } from "./chats-loader.service"
import { ChatsState } from "./chats.state"
import { ExtendedChatsLoader } from "./extended-chats-loader.service"

@NgModule({
  providers: [ChatsLoaderService, ExtendedChatsLoader, ChatsState]
})
export class ChatsModule {
  constructor() {}
}
