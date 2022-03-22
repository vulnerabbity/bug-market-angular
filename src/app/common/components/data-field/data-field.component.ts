import { Component, Input } from "@angular/core"

@Component({
  selector: "common-data-field",
  styleUrls: ["./data-field.component.scss"],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="data-field">
          <span>{{ this.key }}</span>
          <span>{{ this.value }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class CommonDataFieldComponent {
  @Input()
  key = "Key"

  @Input()
  value = "Value"
}
