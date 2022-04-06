import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { FormFieldModel } from "src/app/common/components/form-fields/components/abstract-form-field"
import { AppRouterService } from "src/app/common/services/router.service"
import { UpdateUserService } from "src/app/features/users/update-user.service"
import { User } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"
import { UpdateUserInput } from "src/generated-gql-types"
import { EditUserDialogsService } from "./edit-user-dialogs.service"

@Component({
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"]
})
export class EditUserPage implements OnInit {
  loaded = false
  user!: User

  nameModel: FormFieldModel = { isValid: true, value: "" }
  aboutModel: FormFieldModel = { isValid: true, value: "" }

  constructor(
    private usersService: UsersService,
    private updateUserService: UpdateUserService,
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
      await this.updateUser()
      return await this.redirectToUser()
    }
  }

  async ngOnInit() {
    await this.loadUser()
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
    const currentUserId = await this.getUserId()
    const update = this.getUpdate()
    this.updateUserService.updateUserAsync(currentUserId, update)
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
