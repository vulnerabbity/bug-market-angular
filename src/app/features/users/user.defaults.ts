import { User } from "./users.interface"

export abstract class UserDefaults implements Partial<User> {
  abstract name: "Anonym"
}

export const userDefaults: UserDefaults = {
  name: "Anonym"
}
