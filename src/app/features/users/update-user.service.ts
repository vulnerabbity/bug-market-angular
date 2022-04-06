import { Injectable } from "@angular/core"
import { firstValueFrom, map, Observable } from "rxjs"
import { UpdateUserGQL, UpdateUserInput } from "src/generated-gql-types"

export type UpdateUserStatus = "success" | "error"

@Injectable({
  providedIn: "root"
})
export class UpdateUserService {
  constructor(private updateUserMutation: UpdateUserGQL) {}

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
}
