import { Component, Input } from "@angular/core"

@Component({
  selector: "common-title-text-card",
  templateUrl: "./title-text-card.component.html",
  styleUrls: ["./title-text-card.component.scss"]
})
export class CommonTitleTextCardComponent {
  @Input()
  title: string = "Title"

  @Input()
  text: string = "Text"
}
