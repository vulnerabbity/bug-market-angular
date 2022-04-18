import { Injectable } from "@angular/core"
import { firstValueFrom, map, pluck } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import {
  NotViewedMessagesNumberTotalGQL,
  NotViewedMessagesNumberPerChatGQL
} from "src/generated-gql-types"

@Injectable({ providedIn: "root" })
export class ChatMessagesNumberLoader {
  constructor(
    private totalGql: NotViewedMessagesNumberTotalGQL,
    private perChatGql: NotViewedMessagesNumberPerChatGQL,
    private gqlParser: GraphqlParserService
  ) {}

  async getTotal() {
    return await firstValueFrom(this.getTotal$())
  }

  getTotal$() {
    const response$ = this.totalGql.fetch()

    const parsedResponse$ = response$.pipe(map(res => this.gqlParser.parse<number>(res)))
    return parsedResponse$.pipe(map(res => res.data!))
  }

  async getPerChat(chatId: string) {
    return await firstValueFrom(this.getPerChat$(chatId))
  }

  getPerChat$(chatId: string) {
    const response$ = this.perChatGql.fetch({ chatId })

    const parsedResponse$ = response$.pipe(map(res => this.gqlParser.parse<number>(res)))
    return parsedResponse$.pipe(map(res => res.data!))
  }
}
