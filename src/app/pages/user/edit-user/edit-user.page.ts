import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { CommonAvatarDragAndDropComponent } from "src/app/common/components/drag-and-drop/avatar/avatar.component"
import { FormFieldModel } from "src/app/common/components/form-fields/components/abstract-form-field"
import { AppRouterService } from "src/app/common/services/router.service"
import { UpdateUserService } from "src/app/features/users/update-user.service"
import { UserAbilities } from "src/app/features/users/users-abilities.service"
import { User } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"
import { UpdateUserInput } from "src/generated-gql-types"
import { EditUserDialogsService } from "./edit-user-dialogs.service"

@Component({
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"]
})
export class EditUserPage implements OnInit {
  @ViewChild("avatarDragAndDrop")
  avatarDragAndDrop!: CommonAvatarDragAndDropComponent

  loaded = false
  user!: User

  nameModel: FormFieldModel = { isValid: true, value: "" }
  aboutModel: FormFieldModel = { isValid: true, value: "" }

  constructor(
    private usersService: UsersService,
    private updateUserService: UpdateUserService,
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

  async onApply() {
    const needApply = await this.dialogsService.showApplyConfirmDialog()
    if (needApply) {
      await this.updateUser()
      return await this.redirectToUser()
    }
  }

  async ngOnInit() {
    await this.loadUser()
    const canUpdate = this.userAbilities.canUpdate(this.user)
    if (canUpdate === false) {
      return this.appRouter.redirectToViewUser(this.user.id)
    }

    this.fillFormFieldsWithExistingData()
    this.loaded = true
  }

  private async loadUser() {
    const userId = await this.getUserId()
    const loadedUser = await this.usersService.loadUserAsync({ id: userId })
    this.user = loadedUser
  }

  private fillFormFieldsWithExistingData() {
    const user = this.user

    if (!user) {
      return
    }
    const nameOrDefault = user.name ?? ""
    this.nameModel = { isValid: true, value: nameOrDefault }

    const aboutOrDefault = user.about ?? ""
    this.aboutModel = { isValid: true, value: aboutOrDefault }
  }

  private async updateUser() {
    await this.updateUserFields()
    await this.handlerAvatarChange()
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
    await this.updateUserService.deleteAvatarAsync(this.user.id)
  }

  private async updateAvatar() {
    const avatar = this.avatarDragAndDrop.getCurrentImage()
    if (avatar) {
      await this.updateUserService.uploadAvatarAsync(this.user.id, avatar)
    }
  }

  private async updateUserFields() {
    const currentUserId = await this.getUserId()
    const update = this.getUpdate()
    await this.updateUserService.updateUserAsync(currentUserId, update)
  }

  private async redirectToUser() {
    const userId = await this.getUserId()
    this.appRouter.redirectToViewUser(userId)
  }

  private async getUserId(): Promise<string> {
    const userId$ = this.currentRoute.params.pipe(map(params => params["id"]))
    return await firstValueFrom(userId$)
  }

  private getUpdate(): UpdateUserInput {
    let name: string | null = this.nameModel.value
    let about: string | null = this.aboutModel.value

    if (!name) {
      name = null
    }
    if (!about) {
      about = null
    }

    return { about, name }
  }
}
