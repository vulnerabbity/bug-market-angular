import { Component, Input, OnInit } from "@angular/core"
import { OwlOptions } from "ngx-owl-carousel-o"

@Component({
  selector: "common-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CommonCarousel implements OnInit {
  @Input()
  images: string[] = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.toKUHaOWwBaYjmcQ9Cp5UQHaJP%26pid%3DApi&f=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.pitchfork.com%2Fphotos%2F5f3b196deb982d18c453e0f1%2F2%3A1%2Fw_2560%252Cc_limit%2Fbarack-obama.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.ruposters.ru%2Fnewslead%2F8%2F80e6e8096fc875139708b7a5689d3785.jpg&f=1&nofb=1"
  ]

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

  ngOnInit(): void {
    this.initThumbnails()
  }
  // dot.innerHTML = `<img src="${this.images[0]}"/>`

  initThumbnails() {
    const dots = document.getElementsByClassName("owl-dot")
    setTimeout(() => {
      for (let i = 0; i < dots.length; i++) {
        dots[i].innerHTML = `<img src="${this.images[i]}"/>`
      }
    }, 1000)
  }
}
