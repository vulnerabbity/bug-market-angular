import { Validators } from "@angular/forms"

// first one of a-z
// next "a-z" or "0-9" or "._-"
const usernameRegex = /^[a-z][a-z0-9[._-]*$/

export abstract class AppFormValidators {
  static username = Validators.pattern(usernameRegex)

  static usernameWithLength = Validators.compose([this.username, Validators.maxLength(24)])!
}
