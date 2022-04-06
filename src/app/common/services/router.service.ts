import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { AppPathsEnum } from "src/app/app/app-routing.module"

@Injectable({
  providedIn: "root"
})
export class AppRouterService {
  constructor(private router: Router) {}

  redirectToViewUser(userId: string) {
    const viewUserPath = `/${AppPathsEnum.UserPage}/${userId}`
    this.redirect(viewUserPath)
  }

  redirectToEditUser(userId: string) {
    const editUserPath = `/${AppPathsEnum.EditUserPage}/${userId}`
    this.redirect(editUserPath)
  }

  private redirect(path: string) {
    this.router.navigate([path])
  }
}
