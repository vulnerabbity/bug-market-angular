import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { AppRouterService } from "src/app/common/services/router.service"
import { User } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"
import { EditUserDialogsService } from "./edit-user-dialogs.service"

@Component({
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"]
})
export class EditUserPage implements OnInit {
  loading = false
  user!: User

  constructor(
    private usersService: UsersService,
    private currentRoute: ActivatedRoute,
    private appRouter: AppRouterService,
    private dialogsService: EditUserDialogsService
  ) {}

  async onDiscard() {
    const needDiscard = await this.dialogsService.showDiscardConfirmDialog()
    if (needDiscard) {
      return await this.redirectToUser()
    }
  }

  async onApply() {
    const needApply = await this.dialogsService.showApplyConfirmDialog()
    if (needApply) {
      console.log("send data ... (mock)")
      return await this.redirectToUser()
    }
  }

  async ngOnInit() {
    this.loading = true
    await this.loadUser()
  }

  private async loadUser() {
    const userId = await this.getUserId()
    const loadedUser = await this.usersService.loadUserAsync({ id: userId })
    this.user = loadedUser
  }

  private async redirectToUser() {
    const userId = await this.getUserId()
    this.appRouter.redirectToViewUser(userId)
  }

  private async getUserId(): Promise<string> {
    const userId$ = this.currentRoute.params.pipe(map(params => params["id"]))
    return await firstValueFrom(userId$)
  }
}
