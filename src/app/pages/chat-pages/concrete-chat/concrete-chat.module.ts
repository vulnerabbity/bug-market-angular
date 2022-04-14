import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { ChatFeatureModule } from "src/app/features/chat/chat.feature.module"
import { ConcreteChatPage } from "./concrete-chat.page"
import { MessagesBoxComponent } from "./messages-box/messages-box.component"
import { TopNavbarComponent } from "./top-navbar/top-navbar.component"

@NgModule({
  imports: [AppCommonModule, ChatFeatureModule],
  declarations: [ConcreteChatPage, TopNavbarComponent, MessagesBoxComponent]
})
export class ConcreteChatModule {}
