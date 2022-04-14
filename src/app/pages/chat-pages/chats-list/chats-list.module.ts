import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { ChatFeatureModule } from "src/app/features/chat/chat.feature.module"
import { ChatsListPage } from "./chats-list.page"

@NgModule({
  imports: [ChatFeatureModule, AppCommonModule],
  declarations: [ChatsListPage]
})
export class ChatsListModule {}
