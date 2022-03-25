import { LocalStorageService } from "./local-storage.service"

export class RefreshTokenLocalStorageService extends LocalStorageService<string> {
  constructor() {
    super("refresh_token")
  }
}
