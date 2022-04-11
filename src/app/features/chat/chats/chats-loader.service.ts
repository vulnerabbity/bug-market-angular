import { Injectable, OnDestroy } from "@angular/core"
import { firstValueFrom, map, Observable, pluck, tap } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import { Chat, GetChatsPaginatedGQL, PaginatedChats, Pagination } from "src/generated-gql-types"

@Injectable({
  providedIn: "root"
})
export class ChatsLoaderService {
  constructor(
    private gqlParser: GraphqlParserService,
    private paginatedChatsQuery: GetChatsPaginatedGQL
  ) {}

  async loadOwnChats(pagination?: Pagination) {
    return await firstValueFrom(this.loadOwnChats$(pagination))
  }

  loadOwnChats$(pagination?: Pagination): Observable<PaginatedChats> {
    const response$ = this.loadOwnChatsResponse$(pagination)

    return response$.pipe(map(response => response.data!))
  }

  async loadOwnChatsResponse(pagination?: Pagination) {
    return await firstValueFrom(this.loadOwnChatsResponse$(pagination))
  }

  loadOwnChatsResponse$(pagination?: Pagination) {
    const response$ = this.paginatedChatsQuery.fetch({ pagination })

    const parsedResponse$ = response$.pipe(
      map(response => this.gqlParser.parse<PaginatedChats>(response))
    )

    return parsedResponse$
  }
}
