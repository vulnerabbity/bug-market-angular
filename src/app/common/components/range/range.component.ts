import { Component, EventEmitter, Input, Output } from "@angular/core"

export interface RangeModel {
  min: number | null
  max: number | null
}

@Component({
  selector: "common-range",
  styleUrls: ["./range.component.scss"],
  templateUrl: "./range.component.html"
})
export class CommonRangeComponent {
  @Input()
  model: RangeModel = { min: null, max: null }

  @Output()
  modelChange = new EventEmitter<RangeModel>()

  minValue: null | string = ""
  maxValue: null | string = ""

  onRangeChange() {
    const model = this.getCurrentRangeModel()
    this.modelChange.next(model)
  }

  private getCurrentRangeModel(): RangeModel {
    const min = this.getMinNumber()
    const max = this.getMaxNumber()

    return { min, max }
  }

  private getMinNumber(): number | null {
    if (this.isEmptyString(this.minValue)) {
      return null
    }
    return Number(this.minValue)
  }

  private getMaxNumber(): number | null {
    if (this.isEmptyString(this.maxValue)) {
      return null
    }
    return Number(this.maxValue)
  }

  private isEmptyString(candidate: string | null | undefined) {
    return candidate === "" || candidate === null || candidate === undefined
  }
}
