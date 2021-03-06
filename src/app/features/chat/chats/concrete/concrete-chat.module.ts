import { NgModule } from "@angular/core"
import { ConcreteChatEventsHandler } from "./concrete-chat-events-handler.service"
import { ConcreteChatLoader } from "./concrete-chat-loader.service"
import { ConcreteChatsUpdaterService } from "./concrete-chat-updater.service"
import { ConcreteExtendedChatLoader } from "./concrete-extended-chat-loader.service"
import { CurrentChatState } from "./current-chat.state"

@NgModule({
  providers: [ConcreteChatLoader, ConcreteExtendedChatLoader, ConcreteChatsUpdaterService]
})
export class ConcreteChatModule {
  // instantiate on module load
  constructor(chatState: CurrentChatState, chatEventsHandler: ConcreteChatEventsHandler) {}
}
