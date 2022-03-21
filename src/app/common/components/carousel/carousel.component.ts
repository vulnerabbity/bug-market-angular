import { AfterViewInit, Component, Input, OnInit } from "@angular/core"
import { OwlOptions } from "ngx-owl-carousel-o"

@Component({
  selector: "common-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CommonCarousel implements AfterViewInit {
  @Input()
  images: string[] = []

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navText: ["", ""],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  // after slider loaded
  ngAfterViewInit(): void {
    this.initThumbnails()
    this.initNavigation()
  }

  private initThumbnails() {
    const dots = document.getElementsByClassName("owl-dot")
    for (let i = 0; i < dots.length; i++) {
      dots[i].innerHTML = `<img src="${this.images[i]}"/>`
    }
  }

  private initNavigation() {
    const navigation = document.getElementsByClassName("owl-nav")[0]
    const navigationDestination = document.getElementsByClassName("owl-stage-outer")[0]
    navigationDestination.appendChild(navigation)
  }
}
