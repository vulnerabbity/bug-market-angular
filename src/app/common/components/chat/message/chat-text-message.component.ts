import { Component, Input } from "@angular/core"

@Component({
  selector: "common-chat-message[text]",
  templateUrl: "./chat-text-message.component.html",
  styleUrls: ["./chat-text-message.component.scss"]
})
export class CommonChatTextMessageComponent {
  @Input()
  text = ""

  @Input()
  time: Date | null = null

  @Input()
  color: "accent" | "primary" = "primary"
}
