import { Component, Input } from "@angular/core"
import { ChatMessage } from "src/generated-gql-types"

@Component({
  selector: "concrete-chat__messages-box[messages]",
  templateUrl: "./messages-box.component.html",
  styleUrls: ["./messages-box.component.scss"]
})
export class MessagesBoxComponent {
  @Input()
  messages: ChatMessage[] = []
}
