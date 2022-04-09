import { Injectable } from "@angular/core"
import { firstValueFrom, from, Observable } from "rxjs"
import { CreateSellerGQL, CreateSellerMutationVariables } from "src/generated-gql-types"

export type CreateSellerStatus = "success" | "duplicate" | "unknown"

@Injectable({
  providedIn: "root"
})
export class UsersCreatorService {
  constructor(private createSellerMutation: CreateSellerGQL) {}

  createSeller$(variables: CreateSellerMutationVariables): Observable<CreateSellerStatus> {
    return from(this.createSeller(variables))
  }

  async createSeller(variables: CreateSellerMutationVariables): Promise<CreateSellerStatus> {
    try {
      await firstValueFrom(this.createSellerMutation.mutate(variables))
      return "success"
    } catch (err: any) {
      const error = err.graphQLErrors[0]

      // TODO: add parsing service
      const userAlreadyExists = error.extensions["code"] === "409"
      if (userAlreadyExists) {
        return "duplicate"
      }
      return "unknown"
    }
  }
}
