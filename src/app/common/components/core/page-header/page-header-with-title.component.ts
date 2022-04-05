import { Component, Input } from "@angular/core"

@Component({
  selector: "common-titled-page-header",
  styleUrls: ["./page-header-with-title.component.scss"],
  template: `
    <common-page-header>
      <!-- Limit length without accessibility affect -->
      <h1 class="visually-hidden">{{ title }}</h1>
      <p class="title" role="none">{{ getProcessedTitle() }}</p>

      <ng-content class="input-content"></ng-content>
    </common-page-header>
  `
})
export class CommonPageHeaderWithTitleComponent {
  @Input()
  title: string = "header"

  @Input()
  titleLimit: number | null = null

  private get hasTitleLimit(): boolean {
    return this.titleLimit !== null
  }

  getProcessedTitle() {
    const needCutTitle = this.hasTitleLimit

    if (needCutTitle) {
      const titleLimit = this.titleLimit as number
      return this.getShortTitle(titleLimit)
    }

    return this.title
  }

  private getShortTitle(length = 10) {
    const needCut = this.title.length > length

    if (needCut === false) {
      return this.title
    }
    return this.title.slice(0, length) + "..."
  }
}
