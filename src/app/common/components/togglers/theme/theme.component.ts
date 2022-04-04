import { Component } from "@angular/core"
import {
  AppTheme,
  ThemeLocalStorageService
} from "src/app/features/preferences/storage/theme-storage.service"

interface ToggleEvent {
  checked: boolean
}

@Component({
  selector: "common-theme-toggler",
  template: `
    <mat-slide-toggle [checked]="isTogglerChecked()" (change)="this.onToggle($event)">
    </mat-slide-toggle>
    <mat-icon>{{ getMaterialIconName() }}</mat-icon>
    <style>
      :host {
        display: flex;
        align-items: center;
      }
    </style>
  `
})
export class CommonThemeToggler {
  private readonly lightThemeKey: AppTheme = "indigo-pink-theme"
  private readonly darkThemeKey: AppTheme = "pink-blue-grey-theme"

  private readonly lightThemeTogglerState = false
  private readonly darkThemeTogglerState = true

  private togglerState = false

  constructor(private themeService: ThemeLocalStorageService) {}

  onToggle(event: ToggleEvent) {
    this.togglerState = event.checked
    this.saveTheme()
  }

  isTogglerChecked() {
    return this.isLightTheme() === false
  }

  getMaterialIconName() {
    const lightThemeIconName = "wb_sunny"
    const darkThemeIconName = "brightness_3"

    if (this.isLightTheme()) {
      return lightThemeIconName
    }

    return darkThemeIconName
  }

  private saveTheme() {
    const isDarkTheme = this.togglerState === this.darkThemeTogglerState
    const isLightTheme = this.togglerState === this.lightThemeTogglerState

    if (isDarkTheme) {
      this.themeService.saveRecord(this.darkThemeKey)
    } else if (isLightTheme) {
      this.themeService.saveRecord(this.lightThemeKey)
    }
  }

  private isLightTheme(): boolean {
    const currentTheme = this.getSavedTheme()

    return currentTheme === this.lightThemeKey
  }

  private getSavedTheme() {
    return this.themeService.tryToGetRecord()!
  }
}
