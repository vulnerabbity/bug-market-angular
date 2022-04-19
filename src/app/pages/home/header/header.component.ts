import { Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { Router } from "@angular/router"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { CommonLoginDialogComponent } from "src/app/common/components/dialogs/login/login-dialog.component"
import { AuthorizationService } from "src/app/features/authorization/authorization.service"
import { Product } from "src/app/features/products/products.interface"
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
          <a class="header__big-link" routerLink="products" mat-raised-button>
            <span class="big-link__text">Buy!</span>
          </a>
          <button (click)="onSellClick()" class="header__big-link" mat-raised-button>
            <span class="big-link__text">Sell!</span>
          </button>
        </div>
      </header>
    </common-themed-div>
    <div class="inner-shadow-top"></div>
  `
})
export class HomepageHeaderComponent {
  backgroundPath = assetsPaths.Bug1

  constructor(
    private authorizationService: AuthorizationService,
    private dialogsManager: MatDialog,
    private router: Router
  ) {}

  onSellClick() {
    if (this.canSell()) {
      this.redirectToCreateProduct()
    } else {
      this.openLoginDialog()
    }
  }

  private canSell(): boolean {
    return this.authorizationService.isAllowed("create", Product)
  }

  private openLoginDialog() {
    this.dialogsManager.open(CommonLoginDialogComponent)
  }

  private redirectToCreateProduct() {
    this.router.navigate(["/", AppPathsEnum.CreateProduct])
  }
}
