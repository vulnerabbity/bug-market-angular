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

  get lastPage(): number {
    return Math.floor(this.totalItems / this.itemsPerPage)
  }

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

  isPageActive(pageCandidate: number) {
    return this.currentPage === pageCandidate
  }

  changePage(page: number) {
    this.currentPage = page
    this.pageEmitter.next(this.currentPage)
  }

  getPagesSlice() {
    let previousPages = this.getPreviousPagesWithExtra()
    let nextPages = this.getNextPagesWithExtra()
    const previousPagesLength = previousPages.length
    const nextPagesLength = nextPages.length

    // calculating to always have same pagination buttons number
    const lastIndexOfNextPages =
      this.pagesRange * 2 - Math.min(previousPagesLength, this.pagesRange)
    nextPages = nextPages.slice(0, lastIndexOfNextPages)

    const lastIndexOfPreviousPages =
      this.pagesRange * 2 - Math.min(nextPagesLength, this.pagesRange)
    previousPages = previousPages.reverse().slice(0, lastIndexOfPreviousPages).reverse()

    let pages = [...previousPages, this.currentPage, ...nextPages]

    return pages
  }

  private getPreviousPagesWithExtra(): number[] {
    const pages = []
    const current = this.currentPage
    const start = current - this.pagesRange * 2

    for (let page = start; page < current; page++) {
      if (this.isPageValid(page)) {
        pages.push(page)
      }
    }

    return pages
  }

  private getNextPagesWithExtra(): number[] {
    const pages = []
    const current = this.currentPage
    const start = current + this.pagesRange * 2

    for (let page = start; page > current; page--) {
      if (this.isPageValid(page)) {
        pages.unshift(page)
      }
    }

    return pages
  }

  private isPageValid(pageCandidate: number): boolean {
    const isPositive = pageCandidate > 0
    const lessOrEqualLast = pageCandidate <= this.lastPage
    return isPositive && lessOrEqualLast
  }

  private hasPreviousPage(): boolean {
    return this.currentPage > 1
  }

  private hasNextPage(): boolean {
    const howManySkipped = this.currentPage * this.itemsPerPage
    return howManySkipped < this.totalItems
  }
}
