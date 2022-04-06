import { Injectable } from "@angular/core"
import { AuthorizationService } from "../authorization/authorization.service"
import { User } from "./users.interface"

@Injectable({
  providedIn: "root"
})
export class UserAbilities {
  constructor(private authorization: AuthorizationService) {}

  canUpdate(instance?: User) {
    if (instance) {
      instance = this.convertToCaslCompatible(instance)
    }
    return this.authorization.isAllowed("update", instance ?? User)
  }

  // allow to check instance of class
  private convertToCaslCompatible(user: User): User {
    const caslUser = new User()
    Object.assign(caslUser, user)
    return caslUser
  }
}
