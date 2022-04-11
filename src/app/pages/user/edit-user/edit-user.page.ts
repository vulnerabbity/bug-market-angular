import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { CommonAvatarDragAndDropComponent } from "src/app/common/components/drag-and-drop/avatar/avatar.component"
import { AppRouterService } from "src/app/common/services/router.service"
import { UsersUpdaterService } from "src/app/features/users/users-updater.service"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"
import { UserAbilities } from "src/app/features/users/users-abilities.service"
import { User } from "src/app/features/users/users.interface"
import { EditUserDialogsService } from "./edit-user-dialogs.service"
import { UpdateUserInput } from "src/generated-gql-types"
import { CurrentUserState } from "src/app/features/users/current-user.state"

@Component({
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"]
})
export class EditUserPage implements OnInit {
  @ViewChild("avatarDragAndDrop")
  avatarDragAndDrop!: CommonAvatarDragAndDropComponent

  loading = false
  user!: User

  constructor(
    private userState: CurrentUserState,
    private usersLoader: UsersLoaderService,
    private usersUpdater: UsersUpdaterService,
    private currentRoute: ActivatedRoute,
    private appRouter: AppRouterService,
    private dialogsService: EditUserDialogsService,
    private userAbilities: UserAbilities
  ) {}

  async onDiscard() {
    const needDiscard = await this.dialogsService.showDiscardConfirmDialog()
    if (needDiscard) {
      return await this.redirectToUser()
    }
  }

  async onApply($updateFromForm: UpdateUserInput) {
    const needApply = await this.dialogsService.showApplyConfirmDialog()
    if (needApply) {
      this.loading = true
      await this.updateUser({ fieldsUpdate: $updateFromForm })
      this.loading = false
      return await this.redirectToUser()
    }
  }

  async ngOnInit() {
    this.loading = true
    await this.loadUser()
    const canUpdate = this.userAbilities.canUpdate(this.user)
    if (canUpdate === false) {
      return this.appRouter.redirectToViewUser(this.user.id)
    }

    this.loading = false
  }

  private async loadUser() {
    const userId = await this.getUserId()
    const loadedUser = await this.usersLoader.loadUserOrRedirect({ id: userId })
    this.user = loadedUser
  }

  private async updateUser({ fieldsUpdate }: { fieldsUpdate: UpdateUserInput }) {
    await this.updateUserFields(fieldsUpdate)
    await this.handlerAvatarChange()
    await this.userState.fetchState()
  }

  private async handlerAvatarChange() {
    const needUpdate = this.avatarDragAndDrop.hasNewImage()
    if (needUpdate) {
      return await this.updateAvatar()
    }
    const needDelete = this.avatarDragAndDrop.isImageDeleted()
    if (needDelete) {
      return await this.deleteAvatar()
    }
  }

  private async deleteAvatar() {
    await this.usersUpdater.deleteAvatarAsync(this.user.id)
  }

  private async updateAvatar() {
    const avatar = this.avatarDragAndDrop.getCurrentImage()
    if (avatar) {
      await this.usersUpdater.uploadAvatarAsync(this.user.id, avatar)
    }
  }

  private async updateUserFields(update: UpdateUserInput) {
    const currentUserId = await this.getUserId()
    await this.usersUpdater.updateUserAsync(currentUserId, update)
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
