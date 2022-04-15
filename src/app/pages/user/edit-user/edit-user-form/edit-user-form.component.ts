import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormFieldModel } from "src/app/common/components/form-fields/components/abstract-form-field"
import { User } from "src/app/features/users/users.interface"
import { UpdateUserInput } from "src/generated-gql-types"

@Component({
  selector: "edit-user-page__component[user]",
  templateUrl: "./edit-user-form.component.html",
  styleUrls: ["./edit-user-form.component.scss"]
})
export class EditUserPageFormComponent implements OnInit {
  @Input()
  user!: User

  nameModel: FormFieldModel = { isValid: true, value: "" }
  aboutModel: FormFieldModel = { isValid: true, value: "" }

  @Output("onDiscard")
  private discardEventEmitter = new EventEmitter<void>()

  @Output("onApply")
  private applyEventEmitter = new EventEmitter<UpdateUserInput>()

  ngOnInit(): void {
    this.fillFormFieldsWithExistingData()
  }

  onDiscard() {
    this.discardEventEmitter.emit()
  }

  onApply() {
    this.applyEventEmitter.next(this.getUpdate())
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
