import { Injectable } from "@angular/core"
import { ThemeLocalStorageService } from "./storage/theme-storage.service"

@Injectable({
  providedIn: "root"
})
export class AppPreferencesConfigService {
  constructor(public theme: ThemeLocalStorageService) {}
}
