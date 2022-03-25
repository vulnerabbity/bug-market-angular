import { LocalStorageService } from "./local-storage.service"

export class AccessTokenLocalStorageService extends LocalStorageService<string> {
  constructor() {
    super("access_token")
  }
}
