import { Injectable, OnDestroy } from "@angular/core"
import { firstValueFrom, from, map } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import { ErrorsRouterService } from "src/app/pages/errors/error-router.service"
import { Chat, ChatMessage, GetConcreteChatGQL } from "src/generated-gql-types"

@Injectable({
  providedIn: "root"
})
export class ConcreteChatLoader {
  constructor(
    private gqlParser: GraphqlParserService,
    private concreteChatQuery: GetConcreteChatGQL,
    private errorsRouter: ErrorsRouterService
  ) {}

  loadOwnChatOrRedirect$(chatId: string) {
    return from(this.loadOwnChatOrRedirect(chatId))
  }

  async loadOwnChatOrRedirect(chatId: string) {
    const response = await this.loadConcreteChatResponse(chatId)

    this.errorsRouter.redirectIfError(response)

    return response.data!
  }

  async loadConcreteChatResponse(chatId: string) {
    return await firstValueFrom(this.loadConcreteChatResponse$(chatId))
  }

  loadConcreteChatResponse$(chatId: string) {
    const response$ = this.concreteChatQuery.fetch({ chatId })

    const parsedResponse$ = response$.pipe(map(response => this.gqlParser.parse<Chat>(response)))

    return parsedResponse$
  }
}
