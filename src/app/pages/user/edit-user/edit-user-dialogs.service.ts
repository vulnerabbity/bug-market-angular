import { Injectable } from "@angular/core"
import { CommonDialogsService } from "src/app/common/components/dialogs/dialogs.service"

@Injectable({
  providedIn: "root"
})
export class EditUserDialogsService {
  constructor(private dialogsService: CommonDialogsService) {}

  async showApplyConfirmDialog() {
    return await this.dialogsService.showConfirmDialog({
      message: "Apply?",
      hint: "You can edit your account later"
    })
  }

  async showDiscardConfirmDialog() {
    return await this.dialogsService.showConfirmDialog({
      message: "Are you sure you want to discard all changes?"
    })
  }
}
