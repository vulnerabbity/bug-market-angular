import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
  selector: "common-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"]
})
export class CommonPaginatorComponent {
  @Input()
  totalItems = 100

  @Input()
  itemsPerPage = 10

  @Input()
  currentPage = 1

  @Input()
  pagesRange = 2

  @Output("onPageChange")
  pageEmitter = new EventEmitter<number>()

  isPreviousLocked(): boolean {
    return this.hasPreviousPage() === false
  }

  isNextLocked(): boolean {
    return this.hasNextPage() === false
  }

  onPreviousClick() {
    this.changePage(this.currentPage - 1)
  }

  onNextClick() {
    this.changePage(this.currentPage + 1)
  }

  changePage(page: number) {
    this.currentPage = page
    this.pageEmitter.next(this.currentPage)
  }

  get nearbyPreviousPages(): number[] {
    const range = this.pagesRange

    const pagesBefore = this.getHowManyPagesBefore()
    const nearbyPagesNumber = Math.min(range, pagesBefore)

    return this.getNearbyPreviousPages(nearbyPagesNumber)
  }

  get nearbyNextPages(): number[] {
    const range = this.pagesRange
    const pagesAfter = this.getHowManyPagesAfter()
    const pagesToDisplay = Math.min(pagesAfter, range)

    return this.getNearbyNextPages(pagesToDisplay)
  }

  private getHowManyPagesBefore(): number {
    return this.currentPage - 1
  }

  private getHowManyPagesAfter(): number {
    return this.getTotalPages() - this.currentPage
  }

  private getTotalPages() {
    return this.totalItems / this.itemsPerPage
  }

  private hasPreviousPage(): boolean {
    return this.currentPage > 1
  }

  private hasNextPage(): boolean {
    const howManySkipped = this.currentPage * this.itemsPerPage
    return howManySkipped < this.totalItems
  }

  private getNearbyPreviousPages(limit: number): number[] {
    const currentPage = this.currentPage

    const pages = []
    let pageToAdd = currentPage

    for (let pageIndex = 0; pageIndex < limit; pageIndex++) {
      pageToAdd -= 1
      pages.unshift(pageToAdd)
    }

    return pages
  }

  private getNearbyNextPages(limit: number): number[] {
    const currentPage = this.currentPage

    const pages = []
    let pageToAdd = currentPage
    for (let pageIndex = 0; pageIndex < limit; pageIndex++) {
      pageToAdd += 1
      pages.push(pageToAdd)
    }
    return pages
  }
}
