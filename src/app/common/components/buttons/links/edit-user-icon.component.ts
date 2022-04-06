import { Component, Input } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Component({
  selector: "common-edit-user-icon[userId]",
  styleUrls: ["./edit-user-icon.scss"],
  template: `
    <common-themed-div class="link-back" color="accent">
      <a class="link" mat-icon-button [routerLink]="editUserUrl">
        <mat-icon class="icon" [inline]="true">edit</mat-icon>
      </a>
    </common-themed-div>
  `
})
export class CommonEditUserIconLink {
  @Input()
  userId!: string

  get editUserUrl(): string {
    return `/${AppPathsEnum.EditUserPage}/${this.userId}`
  }
}
