import { Component, EventEmitter, Input, Output } from "@angular/core"
import { MatExpansionPanel } from "@angular/material/expansion"
import { RangeModel } from "../../range/range.component"

@Component({
  selector: "common-range-expander",
  styleUrls: ["./range-expander.component.scss"],
  template: `
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>{{ label }}</mat-panel-title>
        </mat-expansion-panel-header>
        <common-range [(model)]="this.model" (modelChange)="onRangeChange()"></common-range>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  viewProviders: [MatExpansionPanel]
})
export class CommonRangeExpanderComponent {
  @Input()
  label: string = "Range"

  @Input()
  model: RangeModel = { min: null, max: null }

  @Output()
  modelChange = new EventEmitter<RangeModel>()

  onRangeChange() {
    this.modelChange.next(this.model)
  }
}
