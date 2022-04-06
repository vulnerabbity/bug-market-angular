import { Injectable } from "@angular/core"
import { CommonDialogsService } from "src/app/common/components/dialogs/dialogs.service"

@Injectable({ providedIn: "root" })
export class UpdateProductDialogsService {
  constructor(private commonDialogs: CommonDialogsService) {}

  showDiscardUpdateConfirm() {
    const message = "Are you sure you want cancel update?"
    const hint = "All unsaved data will be lost!"

    return this.commonDialogs.showConfirmDialog({ message, hint })
  }
}
