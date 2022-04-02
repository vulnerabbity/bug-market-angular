import { Component, Input } from "@angular/core"

@Component({
  selector: "common-text-card[text]",
  styleUrls: ["./text-card.component.scss"],
  template: `
    <mat-card>
      <mat-card-content>
        <p class="text">
          {{ this.text }}
        </p>
      </mat-card-content>
    </mat-card>
  `
})
export class CommonTextCardComponent {
  @Input()
  text!: string
}
