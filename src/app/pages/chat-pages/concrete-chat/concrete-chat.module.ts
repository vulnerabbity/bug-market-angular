import { NgModule } from "@angular/core"
import { InfiniteScrollModule } from "ngx-infinite-scroll"
import { AppCommonModule } from "src/app/common/common.module"
import { ChatFeatureModule } from "src/app/features/chat/chat.feature.module"
import { BottomNavbarComponent } from "./bottom-navbar/bottom-navbar.component"
import { ConcreteChatPage } from "./concrete-chat.page"
import { MessagesBoxComponent } from "./messages-box/messages-box.component"
import { TopNavbarComponent } from "./top-navbar/top-navbar.component"

@NgModule({
  imports: [AppCommonModule, ChatFeatureModule, InfiniteScrollModule],
  declarations: [ConcreteChatPage, TopNavbarComponent, MessagesBoxComponent, BottomNavbarComponent]
})
export class ConcreteChatModule {}
