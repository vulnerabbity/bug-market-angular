import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, firstValueFrom, map, Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { UpdateUserGQL, UpdateUserInput } from "src/generated-gql-types"

export type UpdateUserStatus = "success" | "error"
export type UpdateAvatarStatus = "success" | "error"
export type DeleteAvatarStatus = "success" | "error"

@Injectable({
  providedIn: "root"
})
export class UpdateUserService {
  constructor(private updateUserMutation: UpdateUserGQL, private http: HttpClient) {}

  async updateUserAsync(id: string, update: UpdateUserInput): Promise<UpdateUserStatus> {
    return firstValueFrom(this.updateUser$(id, update))
  }

  updateUser$(id: string, update: UpdateUserInput): Observable<UpdateUserStatus> {
    return this.updateUserMutation.mutate({ id, update }).pipe(
      map(response => {
        if (response.data) {
          return "success"
        }
        return "error"
      })
    )
  }

  async uploadAvatarAsync(userId: string, avatar: Blob): Promise<UpdateAvatarStatus> {
    return firstValueFrom(this.uploadAvatar$(userId, avatar))
  }

  uploadAvatar$(userId: string, avatar: Blob): Observable<UpdateAvatarStatus> {
    const uploadUrl = this.getAvatarManageEndpoint(userId)
    const body = this.makeAvatarBody(avatar)
    return this.http.post(uploadUrl, body).pipe(
      catchError(() => "error"),
      map(() => "success")
    )
  }

  async deleteAvatarAsync(userId: string) {
    return await firstValueFrom(this.deleteAvatar$(userId))
  }

  deleteAvatar$(userId: string): Observable<DeleteAvatarStatus> {
    const url = this.getAvatarManageEndpoint(userId)
    return this.http.delete(url).pipe(
      catchError(() => "error"),
      map(() => "success")
    )
  }

  private getAvatarManageEndpoint(userId: string) {
    return `${environment.backendUrl}/users/${userId}/avatar`
  }

  private makeAvatarBody(image: Blob): FormData {
    // api accepts avatars with field name "avatar"
    const formWithAvatar = new FormData()
    formWithAvatar.append("avatar", image)

    return formWithAvatar
  }
}
