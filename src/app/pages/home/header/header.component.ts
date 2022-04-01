import { Component } from "@angular/core"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "home-page-header",
  styleUrls: ["./header.component.scss"],
  template: `
    <common-themed-div class="header-wrapper" color="primary">
      <header class="header">
        <img class="header__background display-background" [src]="backgroundPath" role="none" />
        <div class="header__inner">
          <h1 class="header__title">Bug market</h1>
          <p class="header__tagline">Buy and sell</p>
          <a class="header__link-products" routerLink="products" mat-raised-button>
            <span class="link-products__text">Buy!</span>
          </a>
        </div>
      </header>
    </common-themed-div>
  `
})
export class HomepageHeaderComponent {
  backgroundPath = assetsPaths.Bug1
}
