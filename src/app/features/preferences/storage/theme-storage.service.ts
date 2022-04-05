import { Injectable } from "@angular/core"
import { BasePreferenceLocalStorageService } from "./base-preference-storage.service"

export type AppTheme = "indigo-pink-theme" | "pink-blue-grey-theme"

@Injectable({
  providedIn: "root"
})
export class ThemeLocalStorageService extends BasePreferenceLocalStorageService<AppTheme> {
  constructor() {
    super("app_theme", "pink-blue-grey-theme")
  }
}
