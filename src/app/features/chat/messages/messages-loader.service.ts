import { Injectable } from "@angular/core"
import { firstValueFrom, map, Observable } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import {
  ChatMessage,
  GetMessagesGQL,
  PaginatedChatMessages,
  Pagination,
  LastMessageGQL
} from "src/generated-gql-types"

@Injectable({ providedIn: "root" })
export class MessagesLoader {
  constructor(
    private gqlParser: GraphqlParserService,
    private lastMessageQuery: LastMessageGQL,
    private getMessagesQuery: GetMessagesGQL
  ) {}

  async getLastMessageResponse(chatId: string) {
    const response$ = this.getLastMessageResponse$(chatId)

    return await firstValueFrom(response$)
  }

  getLastMessageResponse$(chatId: string) {
    const response$ = this.lastMessageQuery.fetch({ chatId })
    const parsedResponse$ = response$.pipe(
      map(response => this.gqlParser.parse<ChatMessage>(response))
    )

    return parsedResponse$
  }

  async getMessagesResponse(chatId: string, pagination: Pagination) {
    const response$ = this.getMessagesResponse$(chatId, pagination)

    return await firstValueFrom(response$)
  }

  getMessagesResponse$(chatId: string, pagination: Pagination) {
    const response$ = this.getMessagesQuery.fetch({ chatId, pagination })
    const parsedResponse$ = response$.pipe(
      map(response => this.gqlParser.parse<PaginatedChatMessages>(response))
    )

    return parsedResponse$
  }
}
