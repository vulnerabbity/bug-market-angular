import { Component } from "@angular/core"
import { UserStatusService } from "src/app/features/users/user-status.service"

@Component({
  selector: "common-login-or-manage-button",
  template: `
    <common-manage-account-button
      *ngIf="this.isAuthenticated(); else login"
    ></common-manage-account-button>
    <ng-template #login>
      <common-login-button></common-login-button>
    </ng-template>
  `
})
export class CommonLoginOrManageButtonComponent {
  constructor(private userStatus: UserStatusService) {}

  isAuthenticated(): boolean {
    return this.userStatus.isAuthenticated()
  }
}
