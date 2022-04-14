import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { ChatFeatureModule } from "src/app/features/chat/chat.feature.module"
import { ConcreteChatPage } from "./concrete-chat.page"
import { ConcreteChatHeader } from "./header/concrete-chat-navbar.component"
import { MessagesBoxComponent } from "./messages-box/messages-box.component"

@NgModule({
  imports: [AppCommonModule, ChatFeatureModule],
  declarations: [ConcreteChatPage, ConcreteChatHeader, MessagesBoxComponent]
})
export class ConcreteChatModule {}
