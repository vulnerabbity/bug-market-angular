import { Component, OnDestroy } from "@angular/core"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { User } from "src/app/features/users/users.interface"

@Component({
  selector: "common-login-or-manage-button",
  template: `
    <common-manage-account-button
      *ngIf="this.currentUser; else login"
    ></common-manage-account-button>
    <ng-template #login>
      <common-login-button></common-login-button>
    </ng-template>
  `
})
export class CommonLoginOrManageButtonComponent implements OnDestroy {
  currentUser!: User | null

  currentUserSubscription = this.userState.item$.subscribe(
    currentUser => (this.currentUser = currentUser)
  )

  constructor(private userState: CurrentUserState) {}

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
}
